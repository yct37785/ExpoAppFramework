import React, { useState, useContext, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import { Text } from '../Text/Text';
import { padSize025, padSize05, padSize, padSize2 } from '../../../Index/Const';
import OptionComp from './OptionComp';

/**
 * Component for rendering chip options based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
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
const ChipOption = ({
  schema,
  onSelectionChange,
  style={}
}) => {
  const theme = useTheme();

  const renderLabel = ({ option, onPress }) => (
    <Text>{option.label}</Text>
  );

  const renderChip = ({ option, onPress }) => (
    <Chip
      selected={option.state === 1}
      showSelectedCheck={false}
      mode='outlined'
      style={{ backgroundColor: option.state === 1 ? theme.colors.primaryContainer : theme.colors.backdrop, margin: padSize05 }}
      onPress={onPress}
    >
      {option.label}
    </Chip>
  );
  
  const optionsContainer = ({children}) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
      {children}
    </View>
  );

  return (
    <OptionComp
      schema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderChip}
      renderParentOption={renderLabel}
      style={style} />
  );
};

export default memo(ChipOption);