import { useState, useEffect, useMemo } from 'react';
import { deleteDataAS, getAllKeysAS, readDataAS, writeDataAS } from '../API/AsyncStorageAPI';
import { objToKeyValueArr } from '../Utility/GeneralUtility';
const _ = require('lodash');

/**
 * Creates new user data based on LOCAL_DATA_SCHEMA schema, saves it to local storage,
 * and returns a deep copy.
 * 
 * @param {Object} LOCAL_DATA_SCHEMA - The schema for new user data.
 * 
 * @returns {Promise<Object>} A promise that resolves to a deep copy of the new user data.
 */
async function createNewUserData(LOCAL_DATA_SCHEMA) {
  try {
    const keyValList = Object.keys(LOCAL_DATA_SCHEMA).map((key) => {
      return [key, JSON.stringify(LOCAL_DATA_SCHEMA[key])];
    });
    await writeDataAS(keyValList);
    return _.cloneDeep(LOCAL_DATA_SCHEMA);
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
 * 
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
 * @param {Object} LOCAL_DATA_SCHEMA - The schema for new user data.
 * 
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
async function getLocalUserData(LOCAL_DATA_SCHEMA) {
  try {
    let allKeys = await getAllKeysAS();
    
    // DEBUG ONLY, REMOVE
    // if (allKeys.length > 0) {
    //   await deleteDataAS(allKeys);
    //   allKeys = [];
    // }

    if (allKeys.length === 0) {
      return await createNewUserData(LOCAL_DATA_SCHEMA);
    } else {
      const userData = await readDataAS(allKeys);
      const hasMissing = fixNestedKeyValues(userData, LOCAL_DATA_SCHEMA);
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
 * Custom hook for managing immutable local data instance and loading/saving to local storage.
 * The data instance can only be modified via functions.
 *
 * @param {Object} LOCAL_DATA_SCHEMA - The schema for new user data.
 */
const useLocalDataManager = ({ LOCAL_DATA_SCHEMA }) => {
  const schema = useMemo(() => _.cloneDeep(LOCAL_DATA_SCHEMA), []); // immutable schema
  const [data, setData] = useState({}); // Local data instance
  const [isLocalDataLoaded, setIsLocalDataLoaded] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  /**
   * On initialization, fetch data from local storage.
   */
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getLocalUserData(schema);
      if (storedData) {
        setData(storedData);
      } else {
        setData(await createNewUserData(schema));
      }
      setIsLocalDataLoaded(true);
    };
    fetchData();
  }, [schema]);

  /**
   * Set key-value pairs in the data.
   * kvPairs: [[keypath, value], ... ]
   * - key: "level1.level2.level3"
   * - value: any data type
   */
  const setLocalDataValue = async (kvPairs) => {
    let updatedData = { ...data };
    const rootKeysToUpdate = new Set();

    kvPairs.forEach(([path, value]) => {
      const keys = path.split('.');
      let currentLevel = updatedData;

      keys.slice(0, -1).forEach((key) => {
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      });

      currentLevel[keys[keys.length - 1]] = value;
      rootKeysToUpdate.add(keys[0]);
    });

    setData(updatedData);
    setUpdateCount((prev) => prev + 1);

    const toUpdate = Array.from(rootKeysToUpdate).map((rootKey) => [
      rootKey,
      JSON.stringify(updatedData[rootKey]),
    ]);
    await writeDataAS(toUpdate);
  };

  /**
   * Get value from key path.
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
   * Reset data to the initial schema.
   */
  const resetLocalData = async () => {
    const allKeys = await getAllKeysAS();
    if (allKeys.length > 0) {
      await deleteDataAS(allKeys);
    }
    const newData = await createNewUserData(schema);
    setData(newData);
    setUpdateCount((prev) => prev + 1);
  };

  /**
   * Get data as a formatted JSON string.
   */
  const getLocalDataStringify = () => JSON.stringify(data, null, 2);

  return {
    updateCount,
    isLocalDataLoaded,
    setLocalDataValue,
    getLocalDataValue,
    resetLocalData,
    getLocalDataStringify,
  };
};

export default useLocalDataManager;