import React, { memo } from 'react';
import { useTheme } from 'react-native-paper';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { PickerType } from './Picker.types';

/******************************************************************************************************************
 * Picker implementation.
 ******************************************************************************************************************/
export const Picker: PickerType = memo(({ 
  value,
  options,
  onChange,
  style = {}
}) => {
  const theme = useTheme();

  return (
    <RNPicker
      mode='dropdown'
      style={[
        {
          width: '100%',
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
      dropdownIconColor={theme.colors.onSurface}
      selectedValue={value}
      onValueChange={(v) => onChange(v)}
    >
      {options.map((item, idx) => (
        <RNPicker.Item
          key={idx}
          label={item.label}
          value={item.value}
          color={theme.colors.onSurface}
          style={{ backgroundColor: theme.colors.background }}
        />
      ))}
    </RNPicker>
  );
});
