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
 * @property variant  - MD3 text role; defaults to 'bodyMedium'.
 * @property color?   - Optional color override.
 * @property style?   - Optional extra styles.
 * @property children - Text content.
 ******************************************************************************************************************/
export interface TextProps {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children: string | ReactNode;
}

/******************************************************************************************************************
 * Wraps React Native Paper's Text.
 * All typography, color, and spacing behavior comes from Paper's MD3 system.
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
