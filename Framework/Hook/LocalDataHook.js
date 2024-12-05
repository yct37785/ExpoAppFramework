import React, { createContext, useContext, useEffect } from 'react';

/**
 * Local data context for LocalDataManager.
 */
export const LocalDataContext = createContext({
  updateCount: 0,
  setLocalDataValue: () => {},
  getLocalDataValue: () => {},
  resetLocalData: () => {},
  getLocalDataStringify: () => {}
});

/**
 * Hook for on local data update event.
 * 
 * @param {Function} callback - Triggered when local data update occurs.
 */
export const useLocalDataUpdate = (callback) => {
  const { updateCount } = useContext(LocalDataContext);

  useEffect(() => {
    if (updateCount) {
      callback();
    }
  }, [updateCount, callback]);
};