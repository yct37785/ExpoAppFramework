import React, { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

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
 * @property variant          - MD3 text role; defaults to 'bodyMedium'.
 * @property color?           - Optional color override.
 * @property numberOfLines?   - Fixed num of lines if provided.
 * @property style?           - Optional extra styles.
 * @property children?        - Text content.
 ******************************************************************************************************************/
export interface TextProps {
  variant?: TextVariant;
  color?: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
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
export type TextType = React.FC<TextProps>;
