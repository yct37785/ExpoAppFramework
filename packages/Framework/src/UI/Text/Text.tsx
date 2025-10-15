import React, { forwardRef, ReactNode, memo } from 'react';
import {
  Text as RNText,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '../../Theme/ThemeProvider';
import type { TextVariant } from '../../Theme/Theme';

/******************************************************************************************************************
 * Text props.
 * 
 * @property variant - Semantic text role; defaults to 'body'
 * @property disabled?    - Optional color override (e.g., theme.colors.muted)
 * @property style?       - Additional style(s), merged last
 * @property children     - Content of the popup menu
 ******************************************************************************************************************/
export type TextProps = React.ComponentPropsWithoutRef<typeof RNText> & {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Headless Text component with theme-driven variants:
 * - Renders a React Native <Text> using the active Theme from ThemeProvider.
 * - Supports semantic variants defined in `theme.typography.variants` (e.g., 'h1', 'body', 'label2', ...).
 * - Merges caller-provided `style` last; default text color comes from `theme.colors.text`, unless `color` is given.
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
const TextBase = forwardRef<RNText, TextProps>(function Text(
  {
    variant = 'body',
    color,
    style,
    children,
    ...rest
  },
  ref
) {
  const t = useTheme();
  const token = t.typography.variants[variant] ?? t.typography.variants.body;

  const base: TextStyle = {
    fontFamily: token.fontFamily ?? t.typography.fontFamily,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    letterSpacing: token.letterSpacing,
    fontWeight: (token.fontWeight ?? t.typography.weight.regular) as any,
    color: color ?? t.colors.text,
  };
  const combined: StyleProp<TextStyle> = [base, style];
  return (
    <RNText ref={ref} {...rest} style={combined}>
      {children}
    </RNText>
  );
});

export const Text = memo(TextBase);
Text.displayName = 'Text';