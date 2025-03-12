import React, { memo, ReactNode } from 'react';
import { Text, TextProps } from 'react-native-paper';

/**
 * @param query - The search query to highlight.
 * @param highlightColor - The highlight color for query text.
 * @param label - Optional label to prepend to the text.
 */
interface HighlightTextProps extends TextProps<string> {
  query: string;
  highlightColor?: string;
  label?: string;
}

/**
 * highlights search text within text child
 */
export const HighlightText: React.FC<HighlightTextProps> = memo(({
  variant = 'bodyMedium',
  children,
  query,
  highlightColor = 'yellow',
  label = '',
  style = {},
}) => {
  const text = String(children);

  if (!query) {
    return <Text variant={variant} style={style}>{`${label}${text}`}</Text>;
  }

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