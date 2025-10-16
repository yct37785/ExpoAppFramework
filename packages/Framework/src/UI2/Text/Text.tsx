import React, { forwardRef, memo, ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

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
 * @param props - Refer to TextProps
 * 
 * @usage
 * ```tsx
 * <Text variant='h1'>Page Title</Text>
 * <Text variant='subtitle'>Section</Text>
 * <Text variant='body'>Body copy…</Text>
 * <Text variant='label2' color={t.colors.muted}>Secondary label</Text>
 * ```
 ******************************************************************************************************************/
const TextBase: React.FC<TextProps> = ({ variant = 'bodyMedium', color, style, numberOfLines = 1, children }) => {
  return (
    <PaperText variant={variant} numberOfLines={numberOfLines} style={[color ? { color } : null, style]}>
      {children}
    </PaperText>
  );
};

export const Text = memo(TextBase);
Text.displayName = 'Text';