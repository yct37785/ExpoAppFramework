import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILocalDataManagerProps } from '../Index/PropType';
const _ = require('lodash');

/**
 * Local data manager with built-in update effect.
 * 
 * @param defaultSchema - Default key-value schema for local storage.
 */
const useLocalDataManager = (defaultSchema: Record<string, any>): ILocalDataManagerProps => {
  const schema = useRef<Record<string, any>>({ ...defaultSchema });
  const localCache = useRef<Record<string, any>>({});
  const [isLocalDataReady, setIsLocalDataReady] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  const triggerUpdate = () => setUpdateFlag((prev) => prev + 1);

  /**
   * Load local data by checking and filling missing keys.
   */
  const loadLocalData = async (): Promise<void> => {
    try {
      const storedData: ReadonlyArray<[string, string | null]> = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());

      // only read keys that exists in schema
      storedData.forEach(([key, value]) => {
        if (key in schema.current && value !== null) {
          localCache.current[key] = JSON.parse(value);
        }
      });
      // create missing kv pairs on the spot
      const missingKeys = Object.keys(schema.current).filter((key) => !(key in localCache.current));
      if (missingKeys.length) {
        const newEntries: [string, string][] = [];
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
   * @param key - The key to store.
   * @param value - The value to store.
   * @param bypassSchema - Skip schema validation (for testing only).
   */
  const writeLocalData = async (key: string, value: any, bypassSchema = false): Promise<void> => {
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
   * @param key - The key to retrieve.
   * 
   * @returns Deep copy of the stored value.
   */
  const readLocalData = (key: string): any => {
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
   * @returns An object with dangling key-value pairs.
   */
  const readDanglingKeys = async (): Promise<Record<string, any>> => {
    try {
      if (!isLocalDataReady) throw new Error("Data not ready.");
      const allKeys = await AsyncStorage.getAllKeys();
      const danglingKeys = allKeys.filter((key) => !(key in schema.current));
      if (!danglingKeys.length) return {};

      const keyValues = await AsyncStorage.multiGet(danglingKeys);
      return Object.fromEntries(keyValues.map(([key, value]) => {
        return [key, value ? JSON.parse(value) : ""];
      }));
    } catch (e) {
      console.error(`Error reading dangling keys: ${e.message}`);
      throw e;
    }
  };

  /**
   * Clears all dangling keys from storage.
   */
  const clearDanglingKeys = async (): Promise<void> => {
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
    } catch (e) {
      console.error(`Error clearing dangling keys: ${e.message}`);
      throw e;
    }
  };

  /**
   * Clear all key-value pairs. For testing usage.
   */
  const clearLocalData = async (): Promise<void> => {
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

/**
 * Context setup.
 */
const LocalDataContext = createContext<ILocalDataManagerProps | undefined>(undefined);

/**
 * Provider for context.
 */
interface ILocalDataProviderProps {
  children: ReactNode;
  schema: Record<string, any>;
}

export const LocalDataProvider: React.FC<ILocalDataProviderProps> = ({ children, schema }) => {
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
export const useLocalDataContext = (): ILocalDataManagerProps => {
  const context = useContext(LocalDataContext);
  if (!context) {
    throw new Error('useLocalDataContext must be used within a LocalDataProvider');
  }
  return context;
};

/**
 * Utility hook that triggers on local data updates.
 * 
 * @param callback - Triggered when local data updates occur.
 */
export const onLocalDataUpdate = (callback: () => void): void => {
  const { updateFlag } = useLocalDataContext();
  useEffect(() => {
    if (updateFlag) callback();
  }, [updateFlag]);
};