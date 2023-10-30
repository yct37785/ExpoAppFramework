import { useState, useEffect } from 'react';
import { deleteDataAS, getAllKeysAS, readDataAS, writeDataAS, objToKeyValueArr } from '../APIs/AsyncStorageAPI';
const _ = require('lodash');


/**------------------------------------------------------------------------------------*
 * Create new user data based on NEW_USER_DATA schema, saved to local storage 
 * and a deep copy returned
 *------------------------------------------------------------------------------------*/
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

/**------------------------------------------------------------------------------------*
 * fixes nested keyvalues
 * - clones the value if key is previously missing
 * - WILL NOT delete values if key is no longer defined in schema, this should be
 * handled separately (i.e. migration patches)
 *------------------------------------------------------------------------------------*/
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

/**------------------------------------------------------------------------------------*
 * get all locally saved data, will create if no data (keys == 0) and fix if a nested
 * key value pair is missing
 *------------------------------------------------------------------------------------*/
async function getLocalUserData(NEW_USER_DATA) {
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

/**------------------------------------------------------------------------------------*
 * custom hook for managing mutable userData instance and loading/saving to local storage
 *------------------------------------------------------------------------------------*/
const useLocalDataManager = ({ NEW_USER_DATA }) => {
  const [data, setData] = useState({});

  /**
   * on init will fetch from local storage
   */
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getLocalUserData(NEW_USER_DATA);
      if (storedData) {
        setData(storedData);
      }
    };
    fetchData();
  }, []);

  /**----------------------------------------------------------------------------------*
   * set key value pair
   * kvPairs: [[keypath, value],... ]
   * - key: "level1.level2.level3"
   * - value: any data type
   *----------------------------------------------------------------------------------*/
  const setLocalDataValue = async (kvPairs) => {
    let updatedData = { ...data };

    const rootKeysToUpdate = new Set();

    kvPairs.forEach(([path, value]) => {
      const keys = path.split('.');
      let currentLevel = updatedData;

      keys.slice(0, -1).forEach(key => {
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      });

      currentLevel[keys[keys.length - 1]] = value;

      rootKeysToUpdate.add(keys[0]);
    });

    setData(updatedData);

    for (let rootKey of rootKeysToUpdate) {
      await AsyncStorage.setItem(rootKey, JSON.stringify(updatedData[rootKey]));
    }
  };

  return { setLocalDataValue };
};

export default useLocalDataManager;