import React, { memo, ReactNode } from 'react';
import { Text, TextProps } from 'react-native-paper';

interface HighlightTextProps extends TextProps<string> {
  query: string;
  highlightColor?: string;
  label?: string;
  children: ReactNode;
}

/******************************************************************************************************************
 * Render text that highlights occurrences of a query within its children.
 *
 * @param props - Highlight text props:
 *   - query: string            - Substring to highlight, case-insensitive
 *   - highlightColor?: string  - Background color applied to highlighted matches
 *   - label?: string           - Optional prefix text rendered before the content
 *   - children: ReactNode      - Text body to search within
 *   - style?: obj              - Optional style overrides passed to the underlying text
 *
 * @usage
 * ```tsx
 * <HighlightText query="react" highlightColor="lightgreen">
 *   React Native makes mobile development easy with React.
 * </HighlightText>
 * ```
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
