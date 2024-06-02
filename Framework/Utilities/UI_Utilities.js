/*****************************************************************************************
 * Utilities to help with display purposes 
*****************************************************************************************/

/**
 * Highlights search text within a given string.
 * 
 * @param {string} text - The text to search within.
 * @param {string} query - The search query to highlight.
 * @param {string} [variant='bodyMedium'] - The text variant style.
 * @param {string} [label=''] - Optional label to prepend to the text.
 * @returns {JSX.Element} A React element with the highlighted search text.
 */
export const highlightText = (text, query, variant='bodyMedium', label='') => {
  if (!query) {
    return <Text variant={variant}>{`${label}${text}`}</Text>;
  }
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <Text variant={variant}>
      {label}
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text variant={variant} key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};
