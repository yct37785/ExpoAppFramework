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
    // MUI dark background.default / paper ≈ #121212
    background: '#121212',
    surface: '#121212',

    // MUI dark primary.main ≈ #90CAF9
    primary: '#90CAF9',

    // foreground atop lightened primary in dark mode
    onPrimary: '#121212',

    // MUI text.primary / text.secondary (dark)
    text: 'rgba(255,255,255,0.87)',
    muted: 'rgba(255,255,255,0.6)',

    // MUI divider (dark)
    border: 'rgba(255,255,255,0.12)',

    // keep semantic colors recognizable in dark UI
    error: '#D32F2F',
    success: '#2E7D32',
  },
  typography: {
    ...defaultTheme.typography,
    // keep the same scale; dark mode doesn’t change sizing
  },
  // radius and spacing unchanged from defaults
};
