/*****************************************************************************************
 * LocalDataManager: manages local data load/save and state
*****************************************************************************************/
import { useState, useEffect } from 'react';
import { deleteDataAS, getAllKeysAS, readDataAS, writeDataAS } from '../APIs/AsyncStorageAPI';
import { objToKeyValueArr } from '../Utilities/GeneralUtils';
const _ = require('lodash');

/**
 * Creates new user data based on NEW_USER_DATA schema, saves it to local storage,
 * and returns a deep copy.
 * 
 * @param {Object} NEW_USER_DATA - The schema for new user data.
 * @returns {Promise<Object>} A promise that resolves to a deep copy of the new user data.
 */
async function createNewUserData(NEW_USER_DATA) {
  try {
    const keyValList = Object.keys(NEW_USER_DATA).map((key) => {
      return [key, JSON.stringify(NEW_USER_DATA[key])];
    });
    await writeDataAS(keyValList);
    return _.cloneDeep(NEW_USER_DATA);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Fixes nested key-value pairs by cloning the value if the key is previously missing.
 * 
 * @param {Object} currObj - The current object to check.
 * @param {Object} templateObj - The template object with default values.
 * @returns {boolean} True if there were missing keys that were added, false otherwise.
 */
function fixNestedKeyValues(currObj, templateObj) {
  let hasMissing = false;
  for (const key in templateObj) {
    if (!(key in currObj)) {
      currObj[key] = _.cloneDeep(templateObj[key]);
      hasMissing = true;
    } else if (fixNestedKeyValues(currObj[key], templateObj[key])) {
      hasMissing = true;
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
async function getLocalUserData(NEW_USER_DATA) {
  try {
    let allKeys = await getAllKeysAS();
    
    // DEBUG ONLY, REMOVE
    // if (allKeys.length > 0) {
    //   await deleteDataAS(allKeys);
    //   allKeys = [];
    // }

    if (allKeys.length === 0) {
      return await createNewUserData(NEW_USER_DATA);
    } else {
      const userData = await readDataAS(allKeys);
      const hasMissing = fixNestedKeyValues(userData, NEW_USER_DATA);
      if (hasMissing) {
        await writeDataAS(objToKeyValueArr(userData));
        console.log('saved userData for missing keys');
      }
      return userData;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * custom hook for managing immutable local data instance and loading/saving to local storage
 * data instance can only be modified via functions
 */
const useLocalDataManager = ({ NEW_USER_DATA }) => {
  const [data, setData] = useState({}); // will not be exposed to consumers
  const [isLocalDataLoaded, setIsLocalDataLoaded] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [debugMode, setDebugMode] = useState(false);

  /**
   * on init will fetch from local storage
   */
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getLocalUserData(NEW_USER_DATA);
      if (storedData) {
        setData(storedData);
        setIsLocalDataLoaded(true);
      }
    };
    fetchData();
  }, []);

  /**
   * set key value pair
   * kvPairs: [[keypath, value],... ]
   * - key: "level1.level2.level3"
   * - value: any data type
   */
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
    setUpdateCount(updateCount + 1);

    const toUpdate = [];
    for (let rootKey of rootKeysToUpdate) {
      toUpdate.push([rootKey, JSON.stringify(updatedData[rootKey])]);
    }
    await writeDataAS(toUpdate);
  };

  /**
   * get value from key
   * - key: "level1.level2.level3"
   */
  const getLocalDataValue = (keyString) => {
    const keys = keyString.split('.');
    let currentLevel = data;

    for (const key of keys) {
      if (currentLevel[key] === undefined) return undefined; 
      currentLevel = currentLevel[key];
    }

    return currentLevel;
  };

  /**
   * reset data based on schema
   */
  const resetLocalData = async () => {
    let allKeys = await getAllKeysAS();
    if (allKeys.length > 0) {
      await deleteDataAS(allKeys);
    }
    setData(await createNewUserData(NEW_USER_DATA));
    setUpdateCount(updateCount + 1);
  };

  /**
   * get data in JSON string format
   */
  const getLocalDataStringify = () => {
    return JSON.stringify(data, null, 2);
  };

  /**
   * whether to toggle debug flag on/off
   */
  const toggleDebugMode = async () => {
    // if debugMode will be true, always set light mode (text color = black)
    if (!debugMode) {
      await setLocalDataValue([["settings_sample.isDarkMode", false]]);
    }
    setDebugMode(!debugMode);
  }

  return {
    updateCount, isLocalDataLoaded, setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify,
    debugMode, toggleDebugMode
  };
};

export default useLocalDataManager;