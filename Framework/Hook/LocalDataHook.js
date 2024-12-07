import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Local data context for managing stored data. Returns empty when error state to prevent blocking of app flow.
 */
export const LocalDataContext = createContext({
  writeLocalData: () => {},
  readLocalData: () => {},
  readAllLocalData: () => {},
  deleteLocalData: () => {},
  deleteAllLocalData: () => {},
});

/**
 * Local data manager with built-in update effect.
 */
export const useLocalDataManager = ({ LOCAL_KEY_LIST }) => {

  /**
   * Writes a key-value pair to storage.
   */
  const writeLocalData = async (key, value) => {
    try {
      if (key) {
        await AsyncStorage.multiSet([[key, JSON.stringify(value)]]);
      }
    } catch (e) {
      console.log(`Failed to write data: ${e.message}`);
    }
  };

  /**
   * Reads a value by key from storage.
   */
  const readLocalData = async (key) => {
    try {
      let kv_list = await AsyncStorage.multiGet([key]);
      if (kv_list.length === 0) {
        throw new Error("provided key not found in local storage");
      } else {
        return JSON.parse(kv_list.at(0)[1]);
      }
    } catch (e) {
      console.log(`Failed to read data: ${e.message}`);
      return {};
    }
  };

   /**
   * Retrieves all key values from storage.
   */
   const readAllLocalData = async () => {
    try {
      const keyList = await AsyncStorage.getAllKeys();
      let jsonValue = await AsyncStorage.multiGet(keyList);
      const allData = {};
      jsonValue.map((keyValPair) => {
        allData[keyValPair[0]] = JSON.parse(keyValPair[1]);
      });
      return allData;
    } catch (error) {
      console.log(`Failed to read all data: ${error.message}`);
      return {}
    }
  };

  /**
   * Deletes key-value pair from storage.
   */
  const deleteLocalData = async (key) => {
    try {
      await AsyncStorage.multiRemove([key]);
    } catch (error) {
      console.log(`Failed to delete data: ${error.message}`);
    }
  };

  /**
   * Deletes all key-value pairs from storage.
   */
  const deleteAllLocalData = async () => {
    try {
      const keyList = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keyList);
    } catch (error) {
      console.log(`Failed to delete all data: ${error.message}`);
    }
  };

  return {
    writeLocalData,
    readLocalData,
    readAllLocalData,
    deleteLocalData,
    deleteAllLocalData,
  };
};

/**
 * Local data provider for context.
 */
export const LocalDataProvider = ({ children, onUpdate }) => {
  const localDataManager = useLocalDataManager(onUpdate);

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
