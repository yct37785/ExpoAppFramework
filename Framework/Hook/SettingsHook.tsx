import React, { createContext, useEffect, useCallback, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SETTINGS_KEY_ASYNC_STORAGE = "appSettings";

/**
 * local system settings schema
 */
interface SettingsSchema {
  isDarkMode: boolean;
  fontSize: number;
  notificationsEnabled: boolean;
}

/**
 * default values
 */
const defaultSettings: SettingsSchema = {
  isDarkMode: false,
  fontSize: 16,
  notificationsEnabled: true,
}

/**
 * local settings context
 */
interface SettingsContextType {
  settings: SettingsSchema | undefined;
  toggleDarkMode: () => void;
  setFontSize: (size: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * SettingsProvider component
 */
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsSchema | undefined>(undefined);

  /**
   * load settings from AsyncStorage on app startup
   */
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY_ASYNC_STORAGE);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
        } else {
          // if no settings are found, use defaults
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        // fallback to defaults on error
        setSettings(defaultSettings);
      }
    };

    loadSettings();
  }, []);

  /**
   * save settings when change
   */
  const saveSettings = useCallback(async (newSettings: SettingsSchema) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY_ASYNC_STORAGE, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [setSettings]);

  /**
   * toggle functions
   */
  const toggleDarkMode = () => {
    if (settings) {
      saveSettings({ ...settings, isDarkMode: !settings.isDarkMode });
    }
  };

  const setFontSize = (size: number) => {
    if (settings) {
      saveSettings({ ...settings, fontSize: size });
    }
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    if (settings) {
      saveSettings({ ...settings, notificationsEnabled: enabled });
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleDarkMode, setFontSize, setNotificationsEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * hook to use settings in any component
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};