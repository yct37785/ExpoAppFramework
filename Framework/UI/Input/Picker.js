/*****************************************************************************************
 * one option pickers
*****************************************************************************************/
import React, { memo } from 'react';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

/**
 * A dropdown picker component.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.value - The selected value.
 * @param {Array} props.options - Array of options for the picker, each with a label and value.
 * @param {Function} props.onChange - Callback function to handle value change.
 * @returns {JSX.Element} The PickerInput component.
 */
function PickerInput({ value, options, onChange }) {
  const theme = useTheme();
  return (
    <Picker
      mode='dropdown'
      dropdownIconColor={theme.colors.text}
      style={{
        color: theme.colors.text,
        width: '100%',
      }}
      selectedValue={value}
      onValueChange={(v) => onChange(v)}
    >
      {options.map((item, idx) => (
        <Picker.Item 
          key={idx} 
          label={item.label} 
          value={item.value}
          style={{
            color: theme.colors.text, 
            backgroundColor: theme.colors.surfaceVariant
          }} 
        />
      ))}
    </Picker>
  );
}

export default memo(PickerInput);