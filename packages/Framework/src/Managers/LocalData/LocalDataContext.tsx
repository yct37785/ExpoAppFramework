/******************************************************************************************************************
 * React context provider and hook for managing app-wide local data.
 * Built on AsyncStorage for persistence.
 * Holds key value pairs.
 *
 * Features:
 * - Loads data from storage on startup
 * - Exposes default keys (dark mode, language)
 * - Supports custom user-defined key/value pairs
 * - Provides update and reset utilities
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalData, DefaultData, defaultData } from './LocalDataTypes';

/******************************************************************************************************************
 * API exposed by the LocalDataContext.
 *
 * @property data - full local data object (defaults + custom keys)
 * @property setItem - function to set and persist a key/value pair
 * @property getItem - function to retrieve a typed value by key
 * @property reset - reset all data back to defaults
 * @property isLoaded - true once data has been loaded from AsyncStorage
 ******************************************************************************************************************/
type LocalDataContextType = {
  data: LocalData;
  setItem: (key: string, value: any) => Promise<void>;
  getItem: <T = any>(key: string) => T | undefined;
  reset: () => Promise<void>;
  isLoaded: boolean;
};

/******************************************************************************************************************
 * React Context that stores app-wide persisted local data.
 ******************************************************************************************************************/
const LocalDataContext = createContext<LocalDataContextType>({
  data: defaultData,
  setItem: async () => {},
  getItem: () => undefined,
  reset: async () => {},
  isLoaded: false,
});

/******************************************************************************************************************
 * Local data context provider
 *
 * Context provider that manages local data lifecycle.
 * - Loads data from AsyncStorage on mount
 * - Persists updates to AsyncStorage
 * - Provides reset functionality
 ******************************************************************************************************************/
export const LocalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LocalData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // load persisted data on startup
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('local-data');
        if (stored) {
          setData({ ...defaultData, ...JSON.parse(stored) });
        }
      } catch (err) {
        console.warn('Failed to load local data', err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  /****************************************************************************************************************
   * Sets a value in local data and persists it to AsyncStorage.
   *
   * @param key - name of the property to update
   * @param value - new value to store
   ****************************************************************************************************************/
  const setItem = async (key: string, value: any) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    try {
      await AsyncStorage.setItem('local-data', JSON.stringify(newData));
    } catch (err) {
      console.warn('Failed to save local data', err);
    }
  };

  /****************************************************************************************************************
   * Retrieves a value from local data, typed if possible.
   *
   * @param key - property name to retrieve
   * 
   * @returns stored value (typed) or undefined if missing
   * 
   * @throws {Error} if provided key is missing
   ****************************************************************************************************************/
  function getItem<K extends keyof DefaultData>(key: K): DefaultData[K];
  function getItem<T = any>(key: string): T | undefined;
  function getItem(key: string): any {
    if (key in defaultData) {
      if (data[key] === undefined) {
        throw new Error(`Missing required default key: ${key}`);
      }
      return data[key];
    }
    return data[key];
  }

  /****************************************************************************************************************
   * Resets local data back to the default values
   * and persists them to AsyncStorage.
   ****************************************************************************************************************/
  const reset = async () => {
    setData(defaultData);
    try {
      await AsyncStorage.setItem('local-data', JSON.stringify(defaultData));
    } catch (err) {
      console.warn('Failed to reset local data', err);
    }
  };

  return (
    <LocalDataContext.Provider value={{ data, setItem, getItem, reset, isLoaded }}>
      {children}
    </LocalDataContext.Provider>
  );
};

/******************************************************************************************************************
 * Convenience hook for consuming the LocalDataContext.
 *
 * Example:
 * ```tsx
 * const { data, setItem, getItem } = useLocalData();
 * setItem('isDarkMode', true);
 * ```
 ******************************************************************************************************************/
export const useLocalData = () => useContext(LocalDataContext);
