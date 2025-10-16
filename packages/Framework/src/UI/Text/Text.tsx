import React, { memo } from 'react';
import { Text as PaperText } from 'react-native-paper';
import { TextType } from './Text.types';

/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(({ variant = 'bodyMedium', color, style, numberOfLines = 1, children }) => {
  return (
    <PaperText variant={variant} numberOfLines={numberOfLines} style={[color ? { color } : null, style]}>
      {children}
    </PaperText>
  );
});

Text.displayName = 'Text';