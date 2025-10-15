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
 * @property highlight  - Background color for highlighted text
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
  highlight: string;
};

/******************************************************************************************************************
 * Typography.
 * 
 * @property fontFamily - Font family
 * @property weight     - Boldness (regular, medium, bold)
 * @property variants   - Fixed text variants defined by the theme 
 ******************************************************************************************************************/
export type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle' | 'subtitle2'
  | 'body' | 'body2'
  | 'label' | 'label2'
  | 'caption' | 'overline';

export type TextStyleToken = {
  fontSize: number;               // dp
  lineHeight: number;             // dp
  fontWeight?: string | number;   // defaults to Typography.weight.regular if omitted
  letterSpacing?: number;         // dp
  fontFamily?: string;            // defaults to Typography.fontFamily if omitted
};

export type Typography = {
  fontFamily: string;
  weight: { regular: string | number; medium: string | number; bold: string | number };

  /** REQUIRED per-variant tokens for all universal typography roles */
  variants: Record<TextVariant, TextStyleToken>;
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
 * Touch - Touchable ripple effect values used by component.
 *
 * @property pressOpacity       - Opacity on press
 * @property pressInDurationMs  - Press-in duration
 * @property pressOutDurationMs - Press-out duration
 ******************************************************************************************************************/
export type Touch = {
  pressOpacity: number;
  pressInDurationMs: number;
  pressOutDurationMs: number;
};

/******************************************************************************************************************
 * Theme - Runtime theme object consumed by UI.
 *
 * @property colors       - Resolved color tokens
 * @property typography   - Resolved type tokens
 * @property radius       - Resolved radii tokens
 * @property spacing      - Resolved spacing function
 * @property touch        - Resolved touch tokens
 ******************************************************************************************************************/
export type Theme = {
  colors: ColorPalette;
  typography: Typography;
  radius: Radius;
  spacing: Spacing;
  touch: Touch;
};
