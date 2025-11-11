import React, { memo, useMemo } from 'react';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { TextType } from './Text.types';
import { resolveFontColor } from './Utils';

/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(({ variant = 'bodyMedium', color = 'default', style, numberOfLines, children }) => {
  const theme = useTheme();
  const resolvedColor = resolveFontColor(color, theme);

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