import React, { memo, ReactNode } from 'react';
import { Text, TextProps } from 'react-native-paper';

interface HighlightTextProps extends TextProps<string> {
  query: string;
  highlightColor?: string;
  label?: string;
  children: ReactNode;
}

/******************************************************************************************************************
 * Highlight text component
 *
 * A text component that highlights occurrences of a query string within its children.
 *
 * Features:
 * - Case-insensitive substring matching
 * - Supports optional prefix labels
 * - Customizable highlight color
 *
 * @usage
 * ```tsx
 * <HighlightText query='React' highlightColor='lightgreen'>
 *   React Native makes mobile development easy with React.
 * </HighlightText>
 * ```
 *
 * @param query - string to highlight within children
 * @param highlightColor - color applied to highlighted substrings
 * @param label - optional prefix text
 * @param children - text body to search within
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const HighlightText: React.FC<HighlightTextProps> = memo(({
  variant = 'bodyMedium',
  children,
  query,
  highlightColor = 'yellow',
  label = '',
  style = {},
}) => {
  const text = String(children);

  // no query: render plain text
  if (!query) {
    return <Text variant={variant} style={style}>{`${label}${text}`}</Text>;
  }

  // split text into parts with query matches
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text variant={variant} style={style}>
      {label}
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text variant={variant} key={index} style={{ backgroundColor: highlightColor }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
});
