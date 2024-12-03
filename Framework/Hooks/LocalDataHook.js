/*****************************************************************************************
 * Context object for LocalDataManager
 * Callbacks for update events
*****************************************************************************************/
import React, { createContext, useContext, useEffect } from 'react';

/**
 * Local data context.
 */
export const LocalDataContext = createContext({
  updateCount: 0,
  setLocalDataValue: () => {},
  getLocalDataValue: () => {},
  resetLocalData: () => {},
  getLocalDataStringify: () => {}
});

/**
 * Hook for on local data updatge event.
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