import React from 'react';

/**
 * For any user data
 */
export const LocalDataContext = React.createContext({
  localData: null,
  setLocalDataValue: () => {},
});