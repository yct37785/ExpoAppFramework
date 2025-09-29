import type { Theme } from './Theme';

/******************************************************************************************************************
 * Provide Material UI–inspired default Theme (light) used as the base for all app themes.
 ******************************************************************************************************************/
export const defaultTheme: Theme = {
  isDark: false,
  colors: {
    // MUI light: background.default / paper = #FFFFFF
    background: '#FFFFFF',
    surface: '#FFFFFF',

    // MUI primary.main
    primary: '#1976D2',

    // Foreground for primary surfaces (MUI buttons use white text on primary)
    onPrimary: '#FFFFFF',

    // MUI text.primary / text.secondary
    text: 'rgba(0,0,0,0.87)',
    muted: 'rgba(0,0,0,0.6)',

    // MUI divider
    border: 'rgba(0,0,0,0.12)',

    // MUI error.main / success.main
    error: '#D32F2F',
    success: '#2E7D32',
  },
  typography: {
    // Use platform default; keep scale aligned to MUI body/caption sizes
    fontFamily: 'System',
    size: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
    // MUI fontWeightRegular/Medium/Bold ≈ 400/500/700
    weight: { regular: '400', medium: '500', bold: '700' },
    // Approx. 1.5 line-height for body; denser and roomier variants provided
    lineHeight: { normal: 24, dense: 20, roomy: 28 },
  },
  // MUI shape.borderRadius defaults to 4 → expand to sm/md/lg tokens
  radius: { sm: 4, md: 8, lg: 12, pill: 999 },

  // MUI spacing: 8px grid
  spacing: (n = 1) => 8 * n,
};
