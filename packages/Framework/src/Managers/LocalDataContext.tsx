/******************************************************************************************************************
 * Generic local data provider built on AsyncStorage.
 *
 * Features:
 * - Loads all key/value pairs from AsyncStorage on startup.
 * - Ensures reserved default keys (isDarkMode, language, etc.) always exist.
 * - Exposes in-memory object for quick access.
 * - Provides setItem, getItem, and reset utilities.
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localDataDefaults } from '../Const';
import { doLog, doErrLog } from '../Utils';

/******************************************************************************************************************
 * Local data schema and reserved defaults.
 ******************************************************************************************************************/
type LocalData = Record<string, any>;

/******************************************************************************************************************
 * API exposed by the LocalDataContext.
 * 
 * @property data - AsyncStorage keys loaded into memory
 * @property setItem - refer to func
 * @property getItem - refer to func
 * @property clear - refer to func
 * @property isLoaded - true if all AsyncStorage keys are loaded to data
 ******************************************************************************************************************/
type LocalDataContextType = {
  data: LocalData;
  setItem: (key: string, value: any) => Promise<void>;
  getItem: <T = any>(key: string) => T | undefined;
  clear: () => Promise<void>;
  isLoaded: boolean;
};

const LocalDataContext = createContext<LocalDataContextType>({
  data: localDataDefaults,
  setItem: async () => {},
  getItem: () => undefined,
  clear: async () => {},
  isLoaded: false,
});

/******************************************************************************************************************
 * Local data context provider:
 * - Loads AsyncStorage keys on mount.
 * - Ensures reserved defaults exist (creates them if missing).
 * - Provides setItem, getItem, reset.
 ******************************************************************************************************************/
export const LocalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LocalData>(localDataDefaults);
  const [isLoaded, setIsLoaded] = useState(false);

  /****************************************************************************************************************
   * Loads all persisted key/value pairs into memory on startup:
   * - Reads all AsyncStorage keys via `multiGet`.
   * - Parses values into JS objects.
   * - Ensures that reserved default keys (`localDataDefaults`) are present,
   *   writing them to AsyncStorage if missing.
   * - Updates internal state with the merged defaults + stored values.
   ****************************************************************************************************************/
  useEffect(() => {
    (async () => {
      try {
        // DEBUG ONLY: clear all values
        // await clear();
        
        const keys = await AsyncStorage.getAllKeys();
        let parsed: LocalData = {};

        if (keys.length > 0) {
          const stores = await AsyncStorage.multiGet(keys);
          stores.forEach(([key, value]) => {
            if (value !== null) {
              try {
                parsed[key] = JSON.parse(value);
              } catch {
                parsed[key] = value;
              }
            }
          });
        }

        // ensure reserved defaults exist
        const merged = { ...localDataDefaults, ...parsed };
        for (const [key, defValue] of Object.entries(localDataDefaults)) {
          if (!(key in parsed)) {
            await AsyncStorage.setItem(key, JSON.stringify(defValue));
          }
        }

        setData(merged);
      } catch (err) {
        doErrLog('LocalData', 'setItem', `Failed to load local data: ${err}`);
      } finally {
        doLog('LocalData', 'setItem', `Local data loaded`);
        setIsLoaded(true);
      }
    })();
  }, []);

  /****************************************************************************************************************
   * Sets a value in local data and persists it to AsyncStorage.
   *
   * @param key - the string key to set
   * @param value - the value to store (will be JSON.stringified)
   * 
   * @usage
   * ```tsx
   * setItem('isDarkMode', true);
   * ```
   ****************************************************************************************************************/
  const setItem = async (key: string, value: any) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      doErrLog('LocalData', 'setItem', `Failed to save local data for key "${key}": ${err}`);
    }
  };

  /****************************************************************************************************************
   * Retrieves a value from local data.
   * 
   * @param key - the key to fetch
   * 
   * @return - the stored value typed as T, or undefined if missing
   * 
   * @usage
   * ```tsx
   * const lang = getItem<string>('language');
   * ```
   ****************************************************************************************************************/
  function getItem<T = any>(key: string): T | undefined {
    return data[key] as T | undefined;
  }

  /****************************************************************************************************************
   * Resets local data back to the reserved default values:
   * - Overwrites current state with `localDataDefaults`.
   * - Persists default values back into AsyncStorage.
   *
   * @usage
   * ```tsx
   * await reset();
   * ```
   ****************************************************************************************************************/
  const clear = async () => {
    setData({});
    try {
      await AsyncStorage.clear();
    } catch (err) {
      doErrLog('LocalData', 'setItem', `Failed to reset local data: ${err}`);
    }
  };

  return (
    <LocalDataContext.Provider value={{ data, setItem, getItem, clear, isLoaded }}>
      {children}
    </LocalDataContext.Provider>
  );
};

/******************************************************************************************************************
 * Hook for consuming the LocalDataContext.
 *
 * @usage
 * ```tsx
 * const { getItem, setItem, reset, data } = useLocalData();
 * const darkMode = getItem<boolean>('isDarkMode');
 * ```
 ******************************************************************************************************************/
export const useLocalData = () => useContext(LocalDataContext);
