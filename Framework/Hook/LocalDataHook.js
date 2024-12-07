import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const _ = require('lodash');

/**
 * Local data manager with built-in update effect.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.LOCAL_DATA_DEFAULT_KEY_VALUES - List of keys and their default values.
 */
const useLocalDataManager = (LOCAL_DATA_DEFAULT_KEY_VALUES) => {
  const schema = useMemo(() => _.cloneDeep(LOCAL_DATA_DEFAULT_KEY_VALUES), []); // immutable schema
  const [localCache, setLocalCache] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(0);

  /**
   * Change value of updateFlag to trigger re-render
   */
  const triggerUpdateFlag = () => {
    setUpdateFlag((prev) => prev + 1);
  };

  /**
   * Load local data by checking and filling missing keys.
   * Triggers the `onLocalDataReady` event after completion.
   */
  const loadLocalData = async () => {
    try {
      // retrieve all existing kv pairs
      const existingKeys = await AsyncStorage.getAllKeys();
      const keyValues = await AsyncStorage.multiGet(existingKeys);

      // only retrieve keys that exists in schema
      const allData = {};
      keyValues.forEach(([key, value]) => {
        if (schema.hasOwnProperty(key)) {
          allData[key] = JSON.parse(value);
        }
      });
      
      // fill missing keys
      const missingKeys = Object.keys(schema).filter((key) => !existingKeys.includes(key)); // TODO: do not use .includes
      if (missingKeys.length > 0) {
        const missingKeyValues = [];
        for (let i in missingKeys) {
          const key = missingKeys[i];
          allData[key] = _.cloneDeep(schema[key]);
          missingKeyValues.push([key, JSON.stringify(schema[key])]);
        }
        await AsyncStorage.multiSet(missingKeyValues);
      }

      // save to localCache
      setLocalCache({...allData});
    } catch (error) {
      console.error(`Error during data initialization: ${error.message}`);
    }
  };

  useEffect(() => {
    loadLocalData();
  }, []);

  /**
   * Writes a key-value pair to storage.
   * 
   * @param {string} key - The key to store.
   * @param {any} value - The value to store.
   * @param {boolean} [bypassSchema='false'] - Do not validate key with schema, ONLY FOR TESTING USAGE!
   */
  const writeLocalData = async (key, value, bypassSchema = false) => {
    try {
      // if localCache not ready
      if (!localCache) {
        throw new Error("Local data initialization incomplete.");
      }
      // ensure key exists in localCache
      if (!bypassSchema && (!key || !localCache.hasOwnProperty(key))) {
        throw new Error(`Key "${key}" is not listed in the schema.`);
      }
      // write to localCache and storage
      const newLocalCache = { ...localCache };
      newLocalCache[key] = value;
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setLocalCache(newLocalCache);
      // trigger
      triggerUpdateFlag();
    } catch (error) {
      console.error(`Failed to write data: ${error.message}`);
    }
  };

  /**
   * Reads a value by key from storage.
   * 
   * @param {string} key - The key to retrieve.
   * 
   * @returns {any} Value of the KV pair.
   */
  const readLocalData = (key) => {
    try {
      // if localCache not ready
      if (!localCache) {
        throw new Error("Local data initialization incomplete.");
      }
      // ensure key exists in localCache
      if (!key || !localCache.hasOwnProperty(key)) {
        throw new Error(`Key "${key}" is not listed in the schema.`);
      }
      return localCache[key];
    } catch (error) {
      console.error(`Failed to read data: ${error.message}`);
      return null;
    }
  };

  /**
   * Deletes all key-value pairs from storage.
   */
  const deleteAllLocalData = async () => {
    try {
      if (!localCache) throw new Error("Local data initialization incomplete.");
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      setLocalCache({});
      triggerUpdateFlag();
    } catch (error) {
      console.error(`Failed to delete all data: ${error.message}`);
    }
  };

  return {
    isLocalDataReady: localCache !== null,
    updateFlag,
    writeLocalData,
    readLocalData,
    deleteAllLocalData
  };
};

/**
 * Local data context for useLocalDataManager.
 */
const LocalDataContext = createContext({
  isLocalDataReady: false,
  updateFlag: 0,
  writeLocalData: async () => {},
  readLocalData: async () => {},
  deleteAllLocalData: async () => {}
});

/**
 * Local data provider for context.
 */
export const LocalDataProvider = ({ children, schema }) => {
  const localDataManager = useLocalDataManager(schema);

  return (
    <LocalDataContext.Provider value={localDataManager}>
      {children}
    </LocalDataContext.Provider>
  );
};

/**
 * Context consumer hook.
 */
export const useLocalDataContext = () => useContext(LocalDataContext);

/**
 * Utility hook that triggers on local data update event.
 * 
 * @param {Function} callback - Triggered when local data update occurs.
 */
export const onLocalDataUpdate = (callback) => {
  const { isLocalDataReady, updateFlag } = useLocalDataContext();

  useEffect(() => {
    if (isLocalDataReady) {
      callback();
    }
  }, [isLocalDataReady, updateFlag]);
};
