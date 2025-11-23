import React, { memo } from 'react';
import { TextStyle } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { TextType } from './Text.types';
import { resolveFontColor } from './Utils';

/******************************************************************************************************************
 * Text implementation.
 ******************************************************************************************************************/
export const Text: TextType = memo(
  ({ variant = 'bodyMedium', color = 'default', customColor, bold, numberOfLines, style, children }) => {
    const theme = useTheme();
    const resolvedColor = resolveFontColor(color, customColor, theme);

    const colorStyle = { color: resolvedColor };
    const boldStyle: TextStyle = { fontWeight: bold ? 'bold' : 'normal' };

    return (
      <PaperText
        variant={variant}
        {...(numberOfLines !== undefined ? { numberOfLines } : {})}
        style={[colorStyle, boldStyle, style]}
      >
        {children}
      </PaperText>
    );
  }
);