import React, { memo, useMemo } from 'react';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { TextType, TextColor } from './Text.types';

/******************************************************************************************************************
 * TextColor to theme.colors key mapping
 ******************************************************************************************************************/
const tokenToThemeKey: Record<TextColor, string> = {
  default: 'onSurface',
  label: 'onSurfaceVariant',
  disabled: 'onSurfaceDisabled',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  surface: 'surface',
  background: 'background',
  outline: 'outline',
} as const;

/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(({ variant = 'bodyMedium', color = 'default', style, numberOfLines, children }) => {
  const theme = useTheme();

  const key = tokenToThemeKey[color];

  const resolvedColor =
    (theme.colors as any)[key] ??
    theme.colors.onSurface;

  return (
    <PaperText
      variant={variant}
      {...(numberOfLines !== undefined ? { numberOfLines } : {})}
      style={[{ color: resolvedColor }, style]}
    >
      {children}
    </PaperText>
  );
});

Text.displayName = 'Text';