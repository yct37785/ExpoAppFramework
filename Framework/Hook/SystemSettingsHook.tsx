import React, { createContext, useContext, ReactNode } from 'react';

/* define types for context values */
interface ISystemSettingsContextType {
  toggleDarkMode: () => Promise<void>;
}

/* context Setup */
const SystemSettingsContext = createContext<ISystemSettingsContextType | undefined>(undefined);

/**
 * local data provider for context.
 */
interface ISystemSettingsProviderProps {
  children: ReactNode;
  toggleDarkMode: () => Promise<void>;
}

export const SystemSettingsProvider: React.FC<ISystemSettingsProviderProps> = ({ children, toggleDarkMode }) => {
  return (
    <SystemSettingsContext.Provider value={{ toggleDarkMode }}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

/**
 * context consumer hook.
 */
export const useSystemSettingsContext = (): ISystemSettingsContextType => {
  const context = useContext(SystemSettingsContext);
  if (!context) {
    throw new Error("useSystemSettingsContext must be used within a SystemSettingsProvider");
  }
  return context;
};
