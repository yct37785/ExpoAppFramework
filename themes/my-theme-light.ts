import type { Theme } from './Theme';
import { defaultTheme } from './default-theme';

/******************************************************************************************************************
 * Extend the default light Theme with app-specific accents and subtle scale tweaks.
 ******************************************************************************************************************/
export const myThemeLight: Theme = {
  ...defaultTheme,
  isDark: false,
  colors: {
    ...defaultTheme.colors,
    // brighter, punchier primary than stock MUI blue
    primary: '#1F6AFF',
    // subtle card contrast (akin to MUI grey[50])
    surface: '#FAFAFA',
  },
  typography: {
    ...defaultTheme.typography,
    // nudge body text for readability on mobile
    size: { ...defaultTheme.typography.size, md: 17 },
  },
};
