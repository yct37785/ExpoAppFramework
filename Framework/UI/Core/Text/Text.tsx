import React, { memo, ReactNode } from 'react';
import { Text as RNPText, TextProps as RNPTextProps } from 'react-native-paper';

/**
 * text component, wraps react-native-paper text, props identical to react-native-paper
 * 
 * @param variant - https://callstack.github.io/react-native-paper/docs/components/Text/#variant--available-in-v5x-with-theme-version-3
 * @param style - Additional style on base container.
 * @param children - Textual content.
 */
export const Text: React.FC<RNPTextProps<string>> = ({
  variant = 'bodyMedium',
  style = {},
  children
}) => {
  return (
    <RNPText variant={variant} style={style}>
      {children}
    </RNPText>
  );
};

/**
 * HighlightText props
 * 
 * @param query - The search query to highlight.
 * @param highlightColor - The highlight color for query text.
 * @param label - Optional label to prepend to the text.
 */
interface IHighlightTextProps extends RNPTextProps<string> {
  query: string;
  highlightColor?: string;
  label?: string;
};

/**
 * Highlights search text within a given string.
 * 
 * @param variant - https://callstack.github.io/react-native-paper/docs/components/Text/#variant--available-in-v5x-with-theme-version-3
 * @param style - Additional style on base container.
 * @param children - Textual content.
 */
export const HighlightText: React.FC<IHighlightTextProps> = memo(({
  variant = 'bodyMedium',
  children,
  query,
  highlightColor = 'yellow',
  label = '',
  style = {},
}) => {
  const text = String(children); // Convert the children to a string (if it's not already)

  if (!query) {
    return <RNPText variant={variant} style={style}>{`${label}${text}`}</RNPText>;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <RNPText variant={variant} style={style}>
      {label}
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <RNPText variant={variant} key={index} style={{ backgroundColor: highlightColor }}>
            {part}
          </RNPText>
        ) : (
          part
        )
      )}
    </RNPText>
  );
});