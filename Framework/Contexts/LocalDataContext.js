import React from 'react';

/**
 * For any user data
 */
export const LocalDataContext = React.createContext({
  updateCount: 0,
  setLocalDataValue: () => {},
  getLocalDataValue: () => {},
  resetLocalData: () => {},
  getLocalDataStringify: () => {},
});