import React, { memo } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Text } from './Text';
import type { TextProps } from './Text';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/******************************************************************************************************************
 * Highlight text props.
 * 
 * @property query            - Substring to highlight
 * @property caseSensitive?   - Match case (default: false)
 * @property highlightStyle?  - Extra style for highlighted parts (e.g., { backgroundColor: 'yellow' })
 * @property children         - Content of the popup menu
 ******************************************************************************************************************/
type HighlightTextProps = Omit<TextProps, 'children'> & {
  query: string;
  caseSensitive?: boolean;
  highlightStyle?: StyleProp<TextStyle>;
  children: string | React.ReactNode;
};

/******************************************************************************************************************
 * Highlight occurrences of a query inside text content.
 *
 * Summary:
 * - Composes your headless <Text>; no Paper dependency.
 * - Escapes regex specials in `query`.
 * - Case-insensitive by default; toggle with `caseSensitive`.
 * - If `query` is empty or `children` isn't a string, renders plain text.
 *
 * @param props - Refer to HighlightTextProps
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
export const TextHighlight: React.FC<HighlightTextProps> = memo(
  ({
    variant = 'body',
    query,
    caseSensitive = false,
    highlightStyle,
    color,
    style,
    children,
    ...rest
  }) => {
    // only operate on plain strings, otherwise fall back to a single node
    if (typeof children !== 'string' || !query) {
      return (
        <Text variant={variant} color={color} style={style} {...rest}>
          {children}
        </Text>
      );
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const safe = escapeRegExp(query);
    const re = new RegExp(`(${safe})`, flags);
    const parts = children.split(re);

    return (
      <Text variant={variant} color={color} style={style} {...rest}>
        {parts.map((part, i) => {
          const match =
            caseSensitive ? part === query : part.toLowerCase() === query.toLowerCase();

          return match ? (
            <Text key={`h-${i}`} variant={variant} style={highlightStyle}>
              {part}
            </Text>
          ) : (
            <React.Fragment key={`t-${i}`}>{part}</React.Fragment>
          );
        })}
      </Text>
    );
  }
);

TextHighlight.displayName = 'TextHighlight';
