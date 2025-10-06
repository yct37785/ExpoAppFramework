import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Theme } from './Theme';

export type Mode = 'light' | 'dark';

/******************************************************************************************************************
 * Type defining the APIs exposed by ThemeProvider.
 * 
 * @property theme    - Resolved Theme object for the active mode
 * @property mode     - Current mode
 * @property setMode  - Set current mode
 ******************************************************************************************************************/
type ThemeContextValue = {
  theme: Theme;
  mode: Mode;
  setMode: (m: Mode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/******************************************************************************************************************
 * Props provided to ThemeProviderProps at Root.tsx.
 * 
 * @property lightTheme     - Fully specified light theme object
 * @property darkTheme      - Fully specified dark theme object
 * @property themeMode?     - Initial/current scheme (default: 'light')
 * @property children       - Themed subtree
 ******************************************************************************************************************/
type ThemeProviderProps = {
  lightTheme: Theme;
  darkTheme: Theme;
  themeMode?: Mode;
  children: React.ReactNode;
};

/******************************************************************************************************************
 * Provide minimal theming context with internal mode state.
 * - Accept two fully-specified Theme objects (light, dark).
 * - Mode can be switched dynamically.
 *
 * @param props - Refer to ThemeProviderProps
 *
 * @usage
 * ```tsx
 * <ThemeProvider lightTheme={myThemeLight} darkTheme={myThemeDark} initialMode="light">
 *  <App />
 * </ThemeProvider>
 *
 * // in UI components (read-only):
 * const t = useTheme();
 * <View style={{ backgroundColor: t.colors.background }} />
 *
 * // in a settings screen (control mode):
 * const { mode, setMode } = useThemeMode();
 * setMode(mode === 'light' ? 'dark' : 'light');
 * ```
 ******************************************************************************************************************/
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  lightTheme,
  darkTheme,
  themeMode = 'light',
  children,
}) => {
  const [mode, setMode] = useState<Mode>(themeMode);

  // ensure isDark matches the active mode, do not mutate inputs
  const theme = useMemo<Theme>((): Theme => {
    return mode === 'dark'
      ? { ...darkTheme }
      : { ...lightTheme };
  }, [mode, lightTheme, darkTheme]);

  const value = useMemo<ThemeContextValue>(
    (): ThemeContextValue => ({ theme, mode, setMode }),
    [theme, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/******************************************************************************************************************
 * Hook to retrieve the current Theme (for UI styling).
 *
 * @return - ThemeContextValue.theme
 *
 * @usage
 * ```ts
 * const theme = useTheme();
 * ```
 ******************************************************************************************************************/
export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx.theme;
};

/******************************************************************************************************************
 * Hook to read and control the current mode (for settings/UX toggles).
 *
 * @return - ThemeContextValue:
 *  - mode    - .mode
 *  - setMode - .setMode
 *
 * @usage
 * ```ts
 * const { mode, setMode } = useThemeMode();
 * ```
 ******************************************************************************************************************/
export const useThemeMode = (): { mode: Mode; setMode: (m: Mode) => void } => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeProvider');
  return { mode: ctx.mode, setMode: ctx.setMode };
};
