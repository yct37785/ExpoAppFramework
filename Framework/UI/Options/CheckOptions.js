import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from '../Text/Text';
import OptionsComp from './OptionsComp';

/**
 * Component for rendering checkbox options based on a JSON schema.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.schema - JSON schema representing the menu structure.
 * @param {Function} props.onSelectionChange - Callback function to handle selection changes.
 * 
 * @returns {JSX.Element} The CheckOptions component.
 */
const CheckOptions = ({ schema, onSelectionChange }) => {
  const renderCheckbox = ({ option, isSelected, onPress }) => {
    const status = isSelected === 1 ? 'checked' : isSelected === 2 ? 'indeterminate' : 'unchecked';
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox status={status} />
          <Text>{option.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const optionsContainer = ({ children }) => <View>{children}</View>;

  return (
    <OptionsComp
      schema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderCheckbox}
      renderParentOption={renderCheckbox}
      depthPadding={10}
    />
  );
};

export default memo(CheckOptions);