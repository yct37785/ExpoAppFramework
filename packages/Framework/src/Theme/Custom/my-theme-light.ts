import type { Theme } from '../Theme';
import { defaultTheme } from '../default-theme';

/******************************************************************************************************************
 * Extend the default light Theme with app-specific accents and subtle scale tweaks.
 ******************************************************************************************************************/
export const myThemeLight: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    surface: '#FAFAFA',
    primary: '#1F6AFF',
    border: 'rgba(0,0,0,0.2)',
  }
};
