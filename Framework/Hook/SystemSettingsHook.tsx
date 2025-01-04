import React, { createContext, useContext, ReactNode } from 'react';

/**
 * system settings props
 * 
 * @param toggleDarkMode - Defined function to toggle dark mode.
 */
export interface ISystemSettingsContextProps {
  toggleDarkMode: () => Promise<void>;
}

/* context Setup */
const SystemSettingsContext = createContext<ISystemSettingsContextProps | undefined>(undefined);

/**
 * local data provider for context.
 */
interface ISystemSettingsProviderProps extends ISystemSettingsContextProps {
  children: ReactNode;
}

export const SystemSettingsProvider: React.FC<ISystemSettingsProviderProps> = ({ children, toggleDarkMode }) => {
  return (
    <SystemSettingsContext.Provider value={{ toggleDarkMode }}>
      {children}
    </SystemSettingsContext.Provider>
  );
}

/**
 * context consumer hook.
 */
export const useSystemSettingsContext = (): ISystemSettingsContextProps => {
  const context = useContext(SystemSettingsContext);
  if (!context) {
    throw new Error("useSystemSettingsContext must be used within a SystemSettingsProvider");
  }
  return context;
}
