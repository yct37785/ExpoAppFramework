import React, { createContext, useContext, useEffect } from 'react';

/**
 * will not be exposed to end users
 */
export const LocalDataContext = React.createContext({
  updateCount: 0,
  setLocalDataValue: () => {},
  getLocalDataValue: () => {},
  resetLocalData: () => {},
  getLocalDataStringify: () => {},
});

/**
 * callback when local data updates
 */
export const onLocalDataUpdate = (callback) => {
  const { updateCount } = useContext(LocalDataContext);

  useEffect(() => {
    if (updateCount) {
      callback();
    }
  }, [updateCount, callback]);
};

/**
 * expose context functions/values
 */
export const setLocalDataValue = () => {
  return { setLocalDataValue } = useContext(LocalDataContext);
};

export const getLocalDataValue = () => {
  return { getLocalDataValue } = useContext(LocalDataContext);
};

export const resetLocalData = () => {
  return { resetLocalData } = useContext(LocalDataContext);
};

export const getLocalDataStringify = () => {
  return { getLocalDataStringify } = useContext(LocalDataContext);
};