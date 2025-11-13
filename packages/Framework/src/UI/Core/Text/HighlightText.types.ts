import React from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import type { TextProps } from './Text.types';

/******************************************************************************************************************
 * Highlight text props.
 * 
 * @property query            - Substring to highlight
 * @property caseSensitive?   - Match case (default: false)
 * @property highlightStyle?  - Extra style for highlighted parts (e.g., { backgroundColor: 'yellow' })
 ******************************************************************************************************************/
export type HighlightTextProps = TextProps & {
  query: string;
  caseSensitive?: boolean;
  highlightStyle?: StyleProp<TextStyle>;
};

/******************************************************************************************************************
 * A text component that visually emphasizes substrings matching a search or filter query.
 * 
 * @usage
 * ```tsx
 * <TextHighlight
      variant='body'
      query='react'
      highlightStyle={{ backgroundColor: t.colors.primary, color: t.colors.onPrimary }}
    >
      React Native makes mobile development easy with React.
    </TextHighlight>
 * ```
 ******************************************************************************************************************/
export type HighlightTextType = React.FC<HighlightTextProps>;
