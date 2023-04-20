import React from 'react';

/**
 * For any user data
 */
export const DataContext = React.createContext({
  // object
  userData: null,
  // callbacks
  setUserData: () => {},
});