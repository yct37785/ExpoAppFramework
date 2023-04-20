import { NEW_USER_DATA } from '../Common/DefaultValues';
import { deleteDataAS, getAllKeysAS, readDataAS, WriteDataAS, objToKeyValueArr } from './ASUtils';
const _ = require('lodash');

/**------------------------------------------------------------------------------------*
 * Create new user data
 *------------------------------------------------------------------------------------*/
async function createNewUserData() {
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

/**------------------------------------------------------------------------------------*
 * Get all saved words
 *------------------------------------------------------------------------------------*/
// return true if missing found
function checkNested(currObj, templateObj) {
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
      // if nested key is missing
      if (checkNested(currObj[key], templateObj[key])) {
        hasMissing = true;
      }
    }
  }
  return hasMissing;
}

/**------------------------------------------------------------------------------------*
 * defined key values in DefaultValues.js
 *------------------------------------------------------------------------------------*/
export async function getLocalUserData() {
  return new Promise(async (resolve, reject) => {
    try {
      // get all rows
      let allKeys = await getAllKeysAS();
      // DEBUG ONLY, REMOVE
      // if (allKeys.length > 0) {
      //   await deleteDataAS(allKeys);
      //   allKeys = [];
      // }
      // read data
      let userData = {};
      // new user, create new user data
      if (allKeys.length === 0) {
        userData = await createNewUserData();
      } else {
        userData = await readDataAS(Object.keys(NEW_USER_DATA));
        const hasMissing = checkNested(userData, NEW_USER_DATA);
        if (hasMissing) {
          await WriteDataAS(objToKeyValueArr(userData));
          console.log('save userData for missing keys');
        }
      }
      resolve(userData);
    } catch(e) {
      console.log(e);
      reject(e);
    }
  });
}

/**------------------------------------------------------------------------------------*
 * eg. <ID: value> pairs
 *------------------------------------------------------------------------------------*/
export async function getLocalUserDynamicData() {
  return new Promise(async (resolve, reject) => {
    try {
      // get all rows
      let allKeys = await getAllKeysAS();
      // read data
      let dynamicData = {};
      // new user, create new user data
      if (allKeys.length > 0) {
        dynamicData = await readDataAS(allKeys.filter(v => !(v in NEW_USER_DATA)));
      }
      resolve(userData);
    } catch(e) {
      console.log(e);
      reject(e);
    }
  });
}