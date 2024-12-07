import { useState, useEffect, useMemo } from 'react';
import { deleteDataAS, getAllKeysAS, readDataAS, writeDataAS } from '../API/AsyncStorageAPI';
import { objToKeyValueArr } from '../Utility/GeneralUtility';
const _ = require('lodash');

/**
 * Custom hook for retrieving and saving KV string pairs to local storage. All KV string pairs in local storage are considered local data.
 */
const useLocalDataManager = ({}) => {
  const [updateCount, setUpdateCount] = useState(0);

  /**
   * On initialization, fetch data from local storage.
   */
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getLocalUserData(schema);
      const newData = storedData || await createNewUserData(schema);
  
      await new Promise((resolve) => {
        setData(newData);
        setImmediate(() => resolve());
      });
  
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
  
    await new Promise((resolve) => {
      setData(updatedData);
      setUpdateCount((prev) => prev + 1);
  
      // Wait for the state update
      setImmediate(() => resolve());
    });
  
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
  
    await new Promise((resolve) => {
      setData(newData);
      setUpdateCount((prev) => prev + 1);
  
      // Wait for the state update
      setImmediate(() => resolve());
    });
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