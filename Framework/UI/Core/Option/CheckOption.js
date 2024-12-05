import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from '../Text/Text';
import { padSize, padSize2 } from '../../../Index/Const';
import OptionComp from './OptionComp';

/**
 * Component for rendering checkbox options based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu options.
 * @param {string} props.schema.label - The label for the menu option.
 * @param {Object} [props.schema.children] - Nested options for the menu.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * 
 * @returns {JSX.Element} The CheckOptions component.
 */
const CheckOption = ({ schema, onSelectionChange }) => {

  const renderCheckbox = ({ option, onPress }) => {
    const status = option.state === 1 ? 'checked' : option.state === 2 ? 'unchecked' : 'indeterminate';
    return (<TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox status={status} />
        <Text>{option.label}</Text>
      </View>
    </TouchableOpacity>)
  };
  
  const optionsContainer = ({children}) => (
    <View>
      {children}
    </View>
  );

  return (
    <OptionComp
    originalSchema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderCheckbox}
      depthPadding={padSize2}
      />
  );
};

export default memo(CheckOption);