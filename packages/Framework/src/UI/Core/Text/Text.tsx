import React, { memo, useMemo } from 'react';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { TextType } from './Text.types';
import { tokenToRNPaperThemeKey } from '../../../Types';

/******************************************************************************************************************
 * TextColor to theme.colors key mapping
 ******************************************************************************************************************/


/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(({ variant = 'bodyMedium', color = 'default', style, numberOfLines, children }) => {
  const theme = useTheme();

  const key = tokenToRNPaperThemeKey[color];

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