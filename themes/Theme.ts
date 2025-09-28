/******************************************************************************************************************
 * Define the canonical Theme shape used across apps and framework components.
 *
 * @property ColorPalette - Named UI colors used by component:
 *   - background: string   - App background color
 *   - surface: string      - Card/sheet background color
 *   - primary: string      - Primary action/brand color
 *   - onPrimary: string    - Foreground text/icon color shown atop `primary`
 *   - text: string         - Primary body text color
 *   - muted: string        - Secondary/tertiary text (placeholders, captions)
 *   - border: string       - Hairline/border color
 *   - error: string        - Error states, validation messages
 *   - success: string      - Success states, confirmations
 *
 * @property Typography - Font family, sizes, weights, and line heights:
 *   - size: { xs|sm|md|lg|xl }: number                 - Scaled font sizes (dp)
 *   - weight: { regular|medium|bold }: string|number   - Platform weight tokens
 *   - lineHeight: { normal|dense|roomy }: number       - Matching line heights (dp)
 *
 * @property Radius - Corner radii tokens used for controls/surfaces:
 *   - sm|md|lg: number   - Standard radii (dp)
 *   - pill: number       - Very large radius for pill/rounded buttons
 *
 * @property Spacing - Unit spacing function; returns dp given a multiplier
 *
 * @property Theme - Runtime theme object consumed by UI:
 *   - isDark: boolean        - True when representing a dark color scheme
 *   - colors: ColorPalette   - Resolved color tokens
 *   - typography: Typography - Resolved type tokens
 *   - radius: Radius         - Resolved radii tokens
 *   - spacing: Spacing       - Resolved spacing function
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

export type Typography = {
  fontFamily: string;
  size: { xs: number; sm: number; md: number; lg: number; xl: number };
  weight: { regular: string | number; medium: string | number; bold: string | number };
  lineHeight: { normal: number; dense: number; roomy: number };
};

export type Radius = { sm: number; md: number; lg: number; pill: number };

export type Spacing = (multiplier?: number) => number;

export type Theme = {
  isDark: boolean;
  colors: ColorPalette;
  typography: Typography;
  radius: Radius;
  spacing: Spacing;
};
