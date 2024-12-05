import React, { memo } from 'react';
import { Text as RNPText } from 'react-native-paper';

/**
 * text component, wraps react-native-paper text, props identical to react-native-paper
 * 
 * @param {string} Variant - https://callstack.github.io/react-native-paper/docs/components/Text/#variant--available-in-v5x-with-theme-version-3
 * @param {React.ReactNode} props.children - Textual content.
 * 
 * @returns {JSX.Element} A React element with the text.
 */
export const Text = ({ variant = 'bodyMedium', children }) => {
  return (
    <RNPText variant={variant}>
      {children}
    </RNPText>
  );
}

/**
 * Highlights search text within a given string.
 * 
 * @param {string} text - The text to search within.
 * @param {string} query - The search query to highlight.
 * @param {string} highlightColor - The highlight color for query text.
 * @param {string} [label=''] - Optional label to prepend to the text.
 * 
 * @returns {JSX.Element} A React element with the highlighted search text.
 */
export const HighlightText = memo(({
  text,
  query,
  highlightColor = 'yellow',
  label = '',
  ...props
}) => {
  if (!query) {
    return <Text {...props}>{`${label}${text}`}</Text>;
  }
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <Text {...props}>
      {label}
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text {...props} key={index} style={{ backgroundColor: highlightColor }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
});