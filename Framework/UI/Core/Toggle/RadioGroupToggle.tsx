import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Text } from '../Text/Text';

/**
 * radio group options prop
 * - key = key
 * - value = label
 */
export interface IRadioGroupOptions {
  [key: string]: string;
}

/**
 * Props for the RadioGroupToggle component.
 * 
 * @example
 * const options = {
 *   red: { label: 'Red' },
 *   blue: { label: 'Blue' },
 *   green: { label: 'Green' },
 * }
 * 
 * @param options - The options for the radio buttons.
 * @param value - The value of the currently selected option.
 * @param onValueChange - Callback function to handle selection changes.
 * @param style - Additional styles for the container.
 */
interface IRadioGroupToggleProps {
  options: IRadioGroupOptions;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}


/**
 * Component for rendering one set of radio group
 */
const RadioGroupToggle: React.FC<IRadioGroupToggleProps> = ({
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
}

export default memo(RadioGroupToggle);