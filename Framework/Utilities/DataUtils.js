/*****************************************************************************************
* AsyncStorage utilities, only used internally by Framework
*****************************************************************************************/
import { deleteDataAS, getAllKeysAS, readDataAS, WriteDataAS, objToKeyValueArr } from '../APIs/AsyncStorageAPI';
const _ = require('lodash');

/**
 * Creates new user data based on NEW_USER_DATA schema, saves it to local storage,
 * and returns a deep copy.
 * 
 * @param {Object} NEW_USER_DATA - The schema for new user data.
 * @returns {Promise<Object>} A promise that resolves to a deep copy of the new user data.
 */
async function createNewUserData(NEW_USER_DATA) {
  return new Promise(async (resolve, reject) => {
    try {
      // flatten to key value pairs to save individually as dictated by api
      const keyValList = Object.keys(NEW_USER_DATA).map((key) => {
        return [key, JSON.stringify(NEW_USER_DATA[key])];
      });
      await WriteDataAS(keyValList);
      resolve(_.cloneDeep(NEW_USER_DATA));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/**
 * Fixes nested key-value pairs by cloning the value if the key is previously missing.
 * 
 * @param {Object} currObj - The current object to check.
 * @param {Object} templateObj - The template object with default values.
 * @returns {boolean} True if there were missing keys that were added, false otherwise.
 */
function fixNestedKeyValues(currObj, templateObj) {
  if (typeof currObj !== 'object') {
    return false;
  }
  let hasMissing = false;
  for (const key in templateObj) {
    // if key not in curr obj
    if (!(key in currObj)) {
      currObj[key] = _.cloneDeep(templateObj[key]);
      hasMissing = true;
    } else {
      // check nested
      if (checkNested(currObj[key], templateObj[key])) {
        hasMissing = true;
      }
    }
  }
  return hasMissing;
}

/**
 * Gets all locally saved user data, creates new data if no data is found,
 * and fixes missing nested key-value pairs.
 * 
 * @param {Object} NEW_USER_DATA - The schema for new user data.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export async function getLocalUserData(NEW_USER_DATA) {
  return new Promise(async (resolve, reject) => {
    try {
      // get all rows
      let allKeys = await getAllKeysAS();
      // DEBUG ONLY, REMOVE
      if (allKeys.length > 0) {
        await deleteDataAS(allKeys);
        allKeys = [];
      }
      // read data
      let userData = {};
      // new user, create new user data
      if (allKeys.length === 0) {
        userData = await createNewUserData(NEW_USER_DATA);
      } else {
        // read all keys, even if not part of NEW_USER_DATA
        userData = await readDataAS(allKeys);
        // check if keys (root/nested) missing, fill in with default values from NEW_USER_DATA
        const hasMissing = fixNestedKeyValues(userData, NEW_USER_DATA);
        if (hasMissing) {
          await WriteDataAS(objToKeyValueArr(userData));
          console.log('saved userData for missing keys');
        }
      }
      resolve(userData);
    } catch(e) {
      console.log(e);
      reject(e);
    }
  });
}