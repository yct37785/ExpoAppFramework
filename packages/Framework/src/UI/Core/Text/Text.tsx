import React, { memo } from 'react';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { TextType } from './Text.types';
import { resolveFontColor } from './Utils';

/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(
  ({ variant = 'bodyMedium', color = 'default', customColor, numberOfLines, style, children }) => {
    const theme = useTheme();
    const resolvedColor = resolveFontColor(color, customColor, theme);

    const colorStyle = { color: resolvedColor };

    return (
      <PaperText
        variant={variant}
        {...(numberOfLines !== undefined ? { numberOfLines } : {})}
        style={[colorStyle, style]}
      >
        {children}
      </PaperText>
    );
  }
);
