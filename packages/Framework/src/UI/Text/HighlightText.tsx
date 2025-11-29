import React, { memo } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Text } from './Text';
import * as Const from '../../../Const';
import { HighlightTextType } from './HighlightText.types';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const defaultHighlightStyle: TextStyle = {
  backgroundColor: Const.highlightColor,
};

/******************************************************************************************************************
 * HighlightText implementation.
 ******************************************************************************************************************/
export const HighlightText: HighlightTextType = memo(
  ({
    variant = 'bodyMedium',
    color,
    style,
    query,
    caseSensitive = false,
    highlightStyle,
    children,
    ...rest
  }) => {
    // only operate on plain strings, otherwise fall back to a single node
    if (typeof children !== 'string' || !query) {
      return (
        <Text variant={variant} color={color} style={style} {...rest}>
          {children}
        </Text>
      );
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const safe = escapeRegExp(query);
    const re = new RegExp(`(${safe})`, flags);
    const parts = children.split(re);

    const resolvedHighlightStyle: StyleProp<TextStyle> =
      highlightStyle ?? defaultHighlightStyle;

    const normalizedQuery = caseSensitive ? query : query.toLowerCase();

    return (
      <Text variant={variant} color={color} style={style} {...rest}>
        {parts.map((part, i) => {
          const match = caseSensitive
            ? part === normalizedQuery
            : part.toLowerCase() === normalizedQuery;

          return match ? (
            <Text key={`h-${i}`} variant={variant} style={resolvedHighlightStyle}>
              {part}
            </Text>
          ) : (
            <React.Fragment key={`t-${i}`}>{part}</React.Fragment>
          );
        })}
      </Text>
    );
  }
);
