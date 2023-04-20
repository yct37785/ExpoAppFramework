import React from 'react';

/**
 * Theme toggle
 */
export const ThemePrefContext = React.createContext({
  toggleTheme: () => { },
  isThemeDark: false,
});