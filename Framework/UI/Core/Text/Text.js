import React, { memo } from 'react';
import { Text as RNPText } from 'react-native-paper';

/**
 * text component, wraps react-native-paper text, props identical to react-native-paper
 * 
 * @param {string} Variant - https://callstack.github.io/react-native-paper/docs/components/Text/#variant--available-in-v5x-with-theme-version-3
 * @param {Object} [props.style={}] - Additional style on base container.
 * @param {React.ReactNode} props.children - Textual content.
 * 
 * @returns {JSX.Element} A React element with the text.
 */
export const Text = ({
  variant = 'bodyMedium',
  style={},
  children
}) => {
  return (
    <RNPText variant={variant} style={style}>
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
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} A React element with the highlighted search text.
 */
export const HighlightText = memo(({
  variant = 'bodyMedium',
  text,
  query,
  highlightColor = 'yellow',
  label = '',
  style={}
}) => {
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