import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const _ = require('lodash');

/**
 * Local data manager with built-in update effect.
 * 
 * @param {Object} defaultSchema - Default key-value schema for local storage.
 */
const useLocalDataManager = (defaultSchema) => {
  const schema = useRef({ ...defaultSchema });
  const localCache = useRef({});
  const [isLocalDataReady, setIsLocalDataReady] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  const triggerUpdate = () => setUpdateFlag((prev) => prev + 1);

  /**
   * Load local data by checking and filling missing keys.
   */
  const loadLocalData = async () => {
    try {
      const storedData = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());
      // only read keys that exists in schema
      storedData.forEach(([key, value]) => {
        if (key in schema.current) {
          localCache.current[key] = JSON.parse(value);
        }
      });
      // create missing kv pairs on the spot
      const missingKeys = Object.keys(schema.current).filter((key) => !(key in localCache.current));
      if (missingKeys.length) {
        const newEntries = [];
        missingKeys.forEach((key) => {
          if (schema.current[key] !== undefined && schema.current[key] !== null) {
            localCache.current[key] = _.cloneDeep(schema.current[key]);
            newEntries.push([key, JSON.stringify(schema.current[key])]);
          }
        });
        await AsyncStorage.multiSet(newEntries);
      }
      // local data is ready
      setIsLocalDataReady(true);
    } catch (e) {
      console.error(`Error loading data: ${e.message}`);
      throw e;
    }
  };

  useEffect(() => { loadLocalData(); }, []);

  /**
   * Writes a key-value pair to storage if valid.
   * 
   * @param {string} key - The key to store.
   * @param {any} value - The value to store.
   * @param {boolean} [bypassSchema=false] - Skip schema validation (for testing only).
   */
  const writeLocalData = async (key, value, bypassSchema = false) => {
    try {
      if (!isLocalDataReady) throw new Error("Data not ready.");
      if (!(typeof key === 'string')) throw new Error(`Key must be string type.`);
      if (value === null || value === undefined) throw new Error(`value cannot be null.`);
      if (!bypassSchema && !(key in schema.current)) throw new Error(`Invalid key: ${key}`);

      localCache.current[key] = value;
      await AsyncStorage.setItem(key, JSON.stringify(value));
      triggerUpdate();
    } catch (e) {
      console.error(`Error writing to local data: ${e.message}`);
      throw e;
    }
  };

  /**
   * Reads a value by key from storage.
   * 
   * @param {string} key - The key to retrieve.
   * 
   * @returns {any} Deep copy of the stored value.
   */
  const readLocalData = (key) => {
    try {
    if (!isLocalDataReady)  throw new Error("Data not ready.");
    if (!(typeof key === 'string')) throw new Error(`Key must be string type.`);
    if (!(key in localCache.current))  throw new Error(`Key not found: ${key}`);

    return _.cloneDeep(localCache.current[key]);
    } catch (e) {
      console.error(`Error reading local data: ${e.message}`);
      throw e;
    }
  };

  /**
   * Retrieves dangling keys not listed in the schema.
   * 
   * @returns {Object} An object with dangling key-value pairs.
   */
  const readDanglingKeys = async () => {
    try {
      if (!isLocalDataReady) throw new Error("Data not ready.");
      const allKeys = await AsyncStorage.getAllKeys();
      const danglingKeys = allKeys.filter((key) => !(key in schema.current));
      if (!danglingKeys.length) return {};

      const keyValues = await AsyncStorage.multiGet(danglingKeys);
      return Object.fromEntries(keyValues.map(([key, value]) => [key, JSON.parse(value)]));
    } catch (error) {
      console.error(`Error reading dangling keys: ${error.message}`);
      throw e;
    }
  };

  /**
   * Clears all dangling keys from storage.
   */
  const clearDanglingKeys = async () => {
    try {
      if (!isLocalDataReady) throw new Error("Data not ready.");
      const danglingKeys = await readDanglingKeys();
      if (Object.keys(danglingKeys).length) {
        await AsyncStorage.multiRemove(Object.keys(danglingKeys));
        console.info("Dangling keys cleared.");
        triggerUpdate();
      } else {
        console.info("No dangling keys to clear.");
      }
    } catch (error) {
      console.error(`Error clearing dangling keys: ${error.message}`);
      throw e;
    }
  };

  /**
   * Clear all key value pairs. For testing usage.
   */
  const clearLocalData = async () => {
    await AsyncStorage.clear();
    localCache.current = {};
    triggerUpdate();
  };

  return {
    isLocalDataReady,
    updateFlag,
    writeLocalData,
    readLocalData,
    readDanglingKeys,
    clearDanglingKeys,
    clearLocalData
  };
};

/* Context Setup */
const LocalDataContext = createContext({
  isLocalDataReady: false,
  updateFlag: 0,
  writeLocalData: async () => { },
  readLocalData: () => { },
  readDanglingKeys: async () => { },
  clearDanglingKeys: async () => { },
  clearLocalData: async () => { },
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
 * Utility hook that triggers on local data updates.
 * 
 * @param {Function} callback - Triggered when local data updates occur.
 */
export const onLocalDataUpdate = (callback) => {
  const { updateFlag } = useLocalDataContext();
  useEffect(() => {
    if (updateFlag) callback();
  }, [updateFlag]);
};
