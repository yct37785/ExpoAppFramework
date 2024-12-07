import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const _ = require('lodash');

/**
 * Local data manager with built-in update effect.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.LOCAL_DATA_DEFAULT_KEY_VALUES - List of keys and their default values.
 */
export const useLocalDataManager = (LOCAL_DATA_DEFAULT_KEY_VALUES) => {
  const schema = useMemo(() => _.cloneDeep(LOCAL_DATA_DEFAULT_KEY_VALUES), []); // immutable schema
  const [isLocalDataReady, setisLocalDataReady] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  /**
   * Change value of updateFlag to trigger re-render
   */
  const triggerUpdateFlag = () => {
    setUpdateFlag((prev) => prev + 1);
  };

  /**
   * Initializes local data by checking and filling missing keys.
   * Triggers the `onLocalDataReady` event after completion.
   */
  const checkLocalData = async () => {
    try {
      const existingKeys = await AsyncStorage.getAllKeys();
      const missingKeys = Object.keys(schema).filter((key) => !existingKeys.includes(key));

      if (missingKeys.length > 0) {
        const missingKeyValues = missingKeys.map((key) => [key, JSON.stringify(schema[key])]);
        await AsyncStorage.multiSet(missingKeyValues);
      }
      setisLocalDataReady(true);
    } catch (error) {
      console.error(`Error during data initialization: ${error.message}`);
    }
  };

  useEffect(() => {
    checkLocalData();
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
      if (!bypassSchema && (!key || !schema.hasOwnProperty(key))) {
        throw new Error(`Key "${key}" is not listed in the schema.`);
      }
      if (!isLocalDataReady) throw new Error("Local data initialization incomplete.");
      await AsyncStorage.setItem(key, JSON.stringify(value));
      triggerUpdateFlag();
    } catch (error) {
      console.error(`Failed to write data: ${error.message}`);
    }
  };

  /**
   * Reads a value by key from storage.
   * 
   * @param {string} key - The key to retrieve.
   * @param {boolean} [bypassSchema='false'] - Do not validate key with schema, ONLY FOR TESTING USAGE!
   * 
   * @returns {Promise<any>} Value of the KV pair.
   */
  const readLocalData = async (key, bypassSchema = false) => {
    try {
      if (!bypassSchema && (!key || !schema.hasOwnProperty(key))) {
        throw new Error(`Key "${key}" is not listed in the schema.`);
      }
      if (!isLocalDataReady) throw new Error("Local data initialization incomplete.");
      const result = await AsyncStorage.getItem(key);
      if (result === null) throw new Error(`Key "${key}" not found.`);
      return JSON.parse(result);
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
      if (!isLocalDataReady) throw new Error("Local data initialization incomplete.");
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      triggerUpdateFlag();
    } catch (error) {
      console.error(`Failed to delete all data: ${error.message}`);
    }
  };

  return {
    isLocalDataReady,
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
  }, [isLocalDataReady, updateFlag, callback]);
};
