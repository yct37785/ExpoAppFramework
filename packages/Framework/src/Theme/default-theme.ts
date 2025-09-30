import type { Theme } from './Theme';

/******************************************************************************************************************
 * Provide Material UI–inspired default Theme (light) used as the base for all app themes.
 ******************************************************************************************************************/
export const defaultTheme: Theme = {
  isDark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#1976D2',
    onPrimary: '#FFFFFF',
    text: 'rgba(0,0,0,0.87)',
    muted: 'rgba(0,0,0,0.6)',
    border: 'rgba(0,0,0,0.12)',
    error: '#D32F2F',
    success: '#2E7D32',
  },
  typography: {
    fontFamily: 'System',
    weight: { regular: '400', medium: '500', bold: '700' },

    variants: {
      h1:        { fontSize: 40, lineHeight: 48, fontWeight: '700' },
      h2:        { fontSize: 32, lineHeight: 40, fontWeight: '700' },
      h3:        { fontSize: 28, lineHeight: 34, fontWeight: '700' },
      h4:        { fontSize: 24, lineHeight: 30, fontWeight: '600' },
      h5:        { fontSize: 20, lineHeight: 28, fontWeight: '600' },
      h6:        { fontSize: 18, lineHeight: 24, fontWeight: '600' },

      subtitle:  { fontSize: 16, lineHeight: 24, fontWeight: '500', letterSpacing: 0.15 },
      subtitle2: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.10 },

      body:      { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0.50 },
      body2:     { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: 0.25 },

      label:     { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.10 },
      label2:    { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.50 },

      caption:   { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0.40 },
      overline:  { fontSize: 11, lineHeight: 16, fontWeight: '500', letterSpacing: 0.50 },
    },
  },
  radius: { sm: 4, md: 8, lg: 12, pill: 999 },
  spacing: (n = 1) => 8 * n,
};
