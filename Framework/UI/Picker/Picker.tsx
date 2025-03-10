import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

/**
 * picker option prop
 */
export type PickerOption = {
  label: string;
  value: string;
}

/**
 * @param value - The selected value.
 * @param options - Array of options for the picker, each with a label and value.
 * @param onChange - Callback function to handle value change.
 * @param style - Additional style on base container.
 */
type PickerInputProps = {
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dropdown picker component.
 */
export const PickerInput: React.FC<PickerInputProps> = memo(({ 
  value, 
  options, 
  onChange, 
  style = {} 
}) => {
  const theme = useTheme();

  return (
    <Picker
      mode='dropdown'
      style={[{ width: '100%', color: theme.colors.onSurface, backgroundColor: theme.colors.surface }, style]}
      dropdownIconColor={theme.colors.onSurface}
      selectedValue={value}
      onValueChange={(v) => onChange(v)}
    >
      {options.map((item, idx) => (
        <Picker.Item 
          key={idx} 
          label={item.label} 
          value={item.value}
          color={theme.colors.onSurface}
          style={{ backgroundColor: theme.colors.background }}
        />
      ))}
    </Picker>
  );
});