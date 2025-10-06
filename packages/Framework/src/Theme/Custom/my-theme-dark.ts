import type { Theme } from '../Theme';
import { defaultTheme } from '../default-theme';

/******************************************************************************************************************
 * Provide a dark Theme by overriding defaultTheme with dark-safe tokens (MUI dark palette).
 ******************************************************************************************************************/
export const myThemeDark: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#121212',
    surface: '#121212',
    primary: '#90CAF9',
    onPrimary: '#121212',
    text: 'rgba(255,255,255,0.87)',
    muted: 'rgba(255,255,255,0.6)',
    border: 'rgba(255,255,255,0.2)',
    highlight: '#rgba(0, 47, 255, 1)'
  }
};
