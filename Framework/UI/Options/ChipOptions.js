import React, { useState, useContext, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Checkbox } from 'react-native-paper';
import { LinearLayout } from '../Layouts/Layouts';
import { Text } from '../Text/Text';
import { padSize025, padSize05, padSize } from '../../Index/CommonVals';
import OptionsComp from './OptionsComp';

/**
 * Component for rendering chip options based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @returns {JSX.Element} The ChipOptions component.
 *
 * @example
 * const schema = {
 *   label: 'Colors',
 *   children: {
 *     red: { label: 'Red' },
 *     blue: { label: 'Blue' },
 *     green: { label: 'Green' },
 *   },
 * };
 */
const ChipOptions = ({ schema, onSelectionChange }) => {
  const theme = useTheme();
  const renderChip = ({ option, isSelected, onPress }) => (
    <Chip
      selected={isSelected}
      showSelectedCheck={false}
      mode='outlined'
      style={{ backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.backdrop }}
      onPress={onPress}
    >
      {option}
    </Chip>
  );
  return (
    <OptionsComp schema={schema} onSelectionChange={onSelectionChange} renderOption={renderChip} />
  );
};

export default memo(ChipOptions);