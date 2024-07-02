/*****************************************************************************************
 * text display
*****************************************************************************************/
import React, { useRef, memo } from 'react';
import { Text } from 'react-native-paper';

/**
 * Highlights search text within a given string.
 * 
 * @param {string} text - The text to search within.
 * @param {string} query - The search query to highlight.
 * @param {string} highlightColor - The highlight color for query text.
 * @param {string} [label=''] - Optional label to prepend to the text.
 * @returns {JSX.Element} A React element with the highlighted search text.
 */
const HighlightText = ({
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
};

export const HighlightTextDisplayMemo = memo(HighlightText);