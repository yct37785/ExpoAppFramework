/**------------------------------------------------------------------------------------*
 * Utilities for display purposes
 *------------------------------------------------------------------------------------*/

/**
 * highlights search text
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