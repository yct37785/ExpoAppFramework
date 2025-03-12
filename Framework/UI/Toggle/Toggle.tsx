import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

/**
 * radio group options prop
 * - key = key
 * - value = label
 */
export type RadioGroupOptions = {
  [key: string]: string;
}

/**
 * @example
 * const options = {
 *   red: 'Red',
 *   blue: 'Blue',
 *   green: 'Green',
 * }
 * 
 * @param options - The options for the radio buttons.
 * @param value - The value of the currently selected option.
 * @param onValueChange - Callback function to handle selection changes.
 * @param style - Additional styles for the container.
 */
type RadioGroupToggleProps = {
  options: RadioGroupOptions;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * component for rendering one set of radio group
 */
export const RadioGroupToggle: React.FC<RadioGroupToggleProps> = memo(({
  options,
  value,
  onValueChange,
  style = {}
}) => {
  return (
    <RadioButton.Group onValueChange={newValue => onValueChange(newValue)} value={value}>
      <View style={[{ flexDirection: 'row' }, style]}>
        {Object.entries(options).map(([key, label], index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{label}</Text>
              <RadioButton value={key} />
            </View>
          );
        })}
      </View>
    </RadioButton.Group>
  );
});