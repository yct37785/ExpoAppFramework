import type { Theme } from '../Theme';
import { defaultTheme } from '../default-theme';

/******************************************************************************************************************
 * Provide a dark Theme by overriding defaultTheme with dark-safe tokens (MUI dark palette).
 ******************************************************************************************************************/
export const myThemeDark: Theme = {
  ...defaultTheme,
  isDark: true,
  colors: {
    ...defaultTheme.colors,
    background: '#121212',
    surface: '#121212',
    primary: '#90CAF9',
    onPrimary: '#121212',
    text: 'rgba(255,255,255,0.87)',
    muted: 'rgba(255,255,255,0.6)',
    border: 'rgba(255,255,255,0.12)',
  },
  typography: {
    ...defaultTheme.typography,
    variants: {
      ...defaultTheme.typography.variants,
      body:  { ...defaultTheme.typography.variants.body,  letterSpacing: 0.40 },
      body2: { ...defaultTheme.typography.variants.body2, letterSpacing: 0.35 },
    },
  },
};
