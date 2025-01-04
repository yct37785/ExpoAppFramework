import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

/**
 * picker option prop
 */
export interface IPickerOption {
  label: string;
  value: string;
}

/**
 * picker input prop
 * 
 * @param value - The selected value.
 * @param options - Array of options for the picker, each with a label and value.
 * @param onChange - Callback function to handle value change.
 * @param style - Additional style on base container.
 */
export interface IPickerInputProps {
  value: string;
  options: IPickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dropdown picker component.
 */
const PickerInput: React.FC<IPickerInputProps> = ({ 
  value, 
  options, 
  onChange, 
  style = {} 
}) => {
  const theme = useTheme();

  return (
    <Picker
      mode='dropdown'
      dropdownIconColor='green'
      style={[{ color: 'green', width: '100%' }, style]}
      selectedValue={value}
      onValueChange={(v) => onChange(v)}
    >
      {options.map((item, idx) => (
        <Picker.Item 
          key={idx} 
          label={item.label} 
          value={item.value}
          style={{
            color: 'green', 
            backgroundColor: theme.colors.surfaceVariant
          }} 
        />
      ))}
    </Picker>
  );
}

export default memo(PickerInput);