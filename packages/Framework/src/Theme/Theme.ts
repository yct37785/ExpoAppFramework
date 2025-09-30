/******************************************************************************************************************
 * ColorPalette - Named UI colors used by component.
 *
 * @property background - App background color
 * @property surface    - Card/sheet background color
 * @property primary    - Primary action/brand color
 * @property onPrimary  - Foreground text/icon color shown atop `primary`
 * @property text       - Primary body text color
 * @property muted      - Secondary/tertiary text (placeholders, captions)
 * @property border     - Hairline/border color
 * @property error      - Error states, validation messages
 * @property success    - Success states, confirmations
 ******************************************************************************************************************/
export type ColorPalette = {
  background: string;
  surface: string;
  primary: string;
  onPrimary: string;
  text: string;
  muted: string;
  border: string;
  error: string;
  success: string;
};

/******************************************************************************************************************
 * Typography - Font family, sizes, weights, and line heights.
 *
 * @property size       - Scaled font sizes (dp)
 * @property weight     - Platform weight tokens
 * @property lineHeight - Matching line heights (dp)
 ******************************************************************************************************************/
export type Typography = {
  fontFamily: string;
  size: { xs: number; sm: number; md: number; lg: number; xl: number };
  weight: { regular: string | number; medium: string | number; bold: string | number };
  lineHeight: { normal: number; dense: number; roomy: number };
};

/******************************************************************************************************************
 * Radius - Corner radii tokens used for controls/surfaces.
 *
 * @property sm|md|lg - Standard radii (dp)
 * @property pill     - Very large radius for pill/rounded buttons
 ******************************************************************************************************************/
export type Radius = { sm: number; md: number; lg: number; pill: number };

/******************************************************************************************************************
 * Spacing - Unit spacing function; returns dp given a multiplier.
 ******************************************************************************************************************/
export type Spacing = (multiplier?: number) => number;

/******************************************************************************************************************
 * Theme - Runtime theme object consumed by UI.
 *
 * @property isDark       - True when representing a dark color scheme
 * @property colors       - Resolved color tokens
 * @property typography   - Resolved type tokens
 * @property radius       - Resolved radii tokens
 * @property spacing      - Resolved spacing function
 ******************************************************************************************************************/
export type Theme = {
  isDark: boolean;
  colors: ColorPalette;
  typography: Typography;
  radius: Radius;
  spacing: Spacing;
};
