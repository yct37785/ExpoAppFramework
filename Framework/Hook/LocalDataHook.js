import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Local data manager with built-in update effect.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.LOCAL_DATA_DEFAULT_KEY_VALUES - List of keys and their default values.
 * 
 * @returns {Object} Local data management functions.
 */
export const useLocalDataManager = ({ LOCAL_DATA_DEFAULT_KEY_VALUES }) => {
  const schema = useMemo(() => ({ ...LOCAL_DATA_DEFAULT_KEY_VALUES }), []);
  const [isDataReady, setIsDataReady] = useState(false);
  const [updateSubscribers, setUpdateSubscribers] = useState([]);

  /** Triggers all subscribers on data updates. */
  const triggerUpdateSubscribers = () => {
    updateSubscribers.forEach((callback) => callback());
  };

  /**
   * Registers a callback for data updates.
   * 
   * @param {Function} callback - Callback to run when data updates.
   */
  const onLocalDataUpdated = (callback) => {
    if (typeof callback === "function") {
      setUpdateSubscribers((prev) => [...prev, callback]);
    }
  };

  /**
   * Validates the provided key against the schema.
   * 
   * @param {string} key - The key to validate.
   * 
   * @throws Will throw an error if the key is invalid.
   */
  const validateKey = (key) => {
    if (!key || !schema.hasOwnProperty(key)) {
      throw new Error(`Key "${key}" is not listed in the schema.`);
    }
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
      setIsDataReady(true);
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
   */
  const writeLocalData = async (key, value) => {
    try {
      validateKey(key);
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      await AsyncStorage.setItem(key, JSON.stringify(value));
      triggerUpdateSubscribers();
    } catch (error) {
      console.error(`Failed to write data: ${error.message}`);
    }
  };

  /**
   * Reads a value by key from storage.
   * 
   * @param {string} key - The key to retrieve.
   * 
   * @returns {any} The stored value or `null` if not found.
   */
  const readLocalData = async (key) => {
    try {
      validateKey(key);
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      const result = await AsyncStorage.getItem(key);
      if (result === null) throw new Error(`Key "${key}" not found.`);
      return JSON.parse(result);
    } catch (error) {
      console.error(`Failed to read data: ${error.message}`);
      return null;
    }
  };

  /**
   * Retrieves all stored key-value pairs.
   * 
   * @returns {Object} All stored key-value pairs.
   */
  const readAllLocalData = async () => {
    try {
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      const keys = await AsyncStorage.getAllKeys();
      const keyValues = await AsyncStorage.multiGet(keys);
      const allData = {};
      keyValues.forEach(([key, value]) => {
        allData[key] = JSON.parse(value);
      });
      return allData;
    } catch (error) {
      console.error(`Failed to read all data: ${error.message}`);
      return {};
    }
  };

  /**
   * Deletes a key-value pair from storage.
   * 
   * @param {string} key - The key to delete.
   */
  const deleteLocalData = async (key) => {
    try {
      validateKey(key);
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      await AsyncStorage.removeItem(key);
      triggerUpdateSubscribers();
    } catch (error) {
      console.error(`Failed to delete data: ${error.message}`);
    }
  };

  /**
   * Deletes all key-value pairs from storage.
   */
  const deleteAllLocalData = async () => {
    try {
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      triggerUpdateSubscribers();
    } catch (error) {
      console.error(`Failed to delete all data: ${error.message}`);
    }
  };

  /**
   * Retrieves dangling keys not present in the schema.
   * 
   * @returns {Object} Key-value pairs of dangling keys.
   */
  const retrieveDanglingKeys = async () => {
    try {
      if (!isDataReady) throw new Error("Local data initialization incomplete.");
      const keys = await AsyncStorage.getAllKeys();
      const danglingKeys = keys.filter((key) => !schema.hasOwnProperty(key));
      const keyValues = await AsyncStorage.multiGet(danglingKeys);
      const danglingData = {};
      keyValues.forEach(([key, value]) => {
        danglingData[key] = JSON.parse(value);
      });
      return danglingData;
    } catch (error) {
      console.error(`Failed to retrieve dangling keys: ${error.message}`);
      return {};
    }
  };

  return {
    isDataReady,
    writeLocalData,
    readLocalData,
    readAllLocalData,
    deleteLocalData,
    deleteAllLocalData,
    retrieveDanglingKeys,
    onLocalDataUpdated,
  };
};

/**
 * Local data context for managing stored data.
 */
const LocalDataContext = createContext({
  isDataReady: false,
  writeLocalData: () => {},
  readLocalData: () => {},
  readAllLocalData: () => {},
  deleteLocalData: () => {},
  deleteAllLocalData: () => {},
  retrieveDanglingKeys: () => {},
  onLocalDataUpdated: () => {},
});

/**
 * Context consumer hook.
 */
export const useLocalDataContext = () => useContext(LocalDataContext);
