import React, { createContext, useContext } from 'react';

/* Context Setup */
const SystemSettingsContext = createContext({
  toggleDarkMode: async () => { },
});

/**
 * Local data provider for context.
 */
export const SystemSettingsProvider = ({ children, toggleDarkMode }) => {
  return (
    <SystemSettingsContext.Provider value={{ toggleDarkMode: toggleDarkMode }}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

/**
 * Context consumer hook.
 */
export const useSystemSettingsContext = () => useContext(SystemSettingsContext);
