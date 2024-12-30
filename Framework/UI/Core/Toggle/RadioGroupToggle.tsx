import React, { useState, useContext, memo } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Text } from '../Text/Text';

/**
 * Component for rendering one set of radio group
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.options - options in JSON obj: { value: { label: <string> } }
 * @param {string} props.value - value of currently selected option.
 * @param {Function} props.onValueChange - Callback function to handle selection changes.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The RadioGroupToggle component.
 *
 * @example
 * const options = {
 *   red: { label: 'Red' },
 *   blue: { label: 'Blue' },
 *   green: { label: 'Green' },
 * };
 */
const RadioGroupToggle = ({
  options,
  value,
  onValueChange,
  style={}
}) => {
  return (
    <RadioButton.Group onValueChange={newValue => onValueChange(newValue)} style={style} value={value}>
      <View style={{ flexDirection: 'row' }}>
        {Object.entries(options).map(([key, obj], index) => {
          return <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{obj.label}</Text>
            <RadioButton value={key} />
          </View>
        })}
      </View>
    </RadioButton.Group>
  );
};

export default memo(RadioGroupToggle);