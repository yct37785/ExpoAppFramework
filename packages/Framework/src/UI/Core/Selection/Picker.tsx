import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { PickerType } from './Picker.types';

/******************************************************************************************************************
 * Picker implementation.
 ******************************************************************************************************************/
export const Picker: PickerType = memo(
  ({ value, options, onChange, style }) => {
    const theme = useTheme();

    const pickerStyle = [
      styles.pickerBase,
      {
        color: theme.colors.onSurface,
        backgroundColor: theme.colors.surface,
      },
      style,
    ];

    return (
      <RNPicker
        mode="dropdown"
        style={pickerStyle}
        dropdownIconColor={theme.colors.onSurface}
        selectedValue={value}
        onValueChange={onChange}
      >
        {options.map((item) => (
          <RNPicker.Item
            key={String(item.value ?? item.label)}
            label={item.label}
            value={item.value}
            color={theme.colors.onSurface}
            style={{ backgroundColor: theme.colors.background }}
          />
        ))}
      </RNPicker>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  pickerBase: {
    width: '100%',
  },
});
