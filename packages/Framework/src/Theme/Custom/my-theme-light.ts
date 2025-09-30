import type { Theme } from '../Theme';
import { defaultTheme } from '../default-theme';

/******************************************************************************************************************
 * Extend the default light Theme with app-specific accents and subtle scale tweaks.
 ******************************************************************************************************************/
export const myThemeLight: Theme = {
  ...defaultTheme,
  isDark: false,
  colors: {
    ...defaultTheme.colors,
    primary: '#1F6AFF',
    surface: '#FAFAFA',
  },
  typography: {
    ...defaultTheme.typography,
    variants: {
      ...defaultTheme.typography.variants,
      h1: { ...defaultTheme.typography.variants.h1, fontSize: 42 },
      body: { ...defaultTheme.typography.variants.body, letterSpacing: 0.25 },
    },
  },
};
