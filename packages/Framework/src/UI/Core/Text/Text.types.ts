import React, { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

/******************************************************************************************************************
 * declared locally for VSC intelliSense
 ******************************************************************************************************************/
type FontColor =
  | 'default'
  | 'label'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'surface'
  | 'background'
  | 'outline';

/******************************************************************************************************************
 * MD3 typography variants.
 ******************************************************************************************************************/
export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

/******************************************************************************************************************
 * Text props.
 * 
 * @property variant          - MD3 text role; defaults to 'bodyMedium'
 * @property color?           - Font color
 * @property customColor?     - Raw color string (overrides color prop)
 * @property bold?            - Bolded text
 * @property numberOfLines?   - Fixed num of lines if provided
 * @property style?           - Optional extra styles
 * @property children?        - Text content
 ******************************************************************************************************************/
// opts
export interface TextProps {
  variant?: TextVariant;
  color?: FontColor;
  customColor?: string;
  bold?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}
// comp
interface TextCompProps extends TextProps {
  children?: string | ReactNode;
}

/******************************************************************************************************************
 * A theme-aware text component supporting typography variants defined by the Material Design 3 spec.
 *
 * @usage
 * ```tsx
 * <Text variant='h1'>Page Title</Text>
 * <Text variant='subtitle'>Section</Text>
 * <Text variant='body'>Body copy…</Text>
 * <Text variant='label2' color={t.colors.muted}>Secondary label</Text>
 * ```
 ******************************************************************************************************************/
export type TextType = React.FC<TextCompProps>;
