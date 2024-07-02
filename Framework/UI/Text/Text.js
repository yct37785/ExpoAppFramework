/*****************************************************************************************
 * text display
*****************************************************************************************/
import React, { useContext, memo } from 'react';
import { useTheme, Text as RNPText } from 'react-native-paper';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * text component, wraps react-native-paper text, props identical to react-native-paper
 * 
 * @param {React.ReactNode} props.children - Textual content.
 * @returns {JSX.Element} A React element with the text.
 */
export const Text = ({children, ...props}) => {
  const theme = useTheme();
  const { debugMode } = useContext(LocalDataContext);
  return (
    <RNPText style={{ color: debugMode ? '#000' : theme.colors.text }} {...props}>
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