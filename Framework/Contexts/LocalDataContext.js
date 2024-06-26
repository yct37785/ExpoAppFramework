/*****************************************************************************************
 * Context object for LocalDataManager
 * Callbacks for update events
*****************************************************************************************/
import React, { createContext, useContext, useEffect } from 'react';

/**
 * context
 */
export const LocalDataContext = React.createContext({
  updateCount: 0,
  setLocalDataValue: () => {},
  getLocalDataValue: () => {},
  resetLocalData: () => {},
  getLocalDataStringify: () => {},
  debugMode: false,
  toggleDebugMode: () => {},
});

/**
 * callbacks
 */
export const onLocalDataUpdate = (callback) => {
  const { updateCount } = useContext(LocalDataContext);

  useEffect(() => {
    if (updateCount) {
      callback();
    }
  }, [updateCount, callback]);
};