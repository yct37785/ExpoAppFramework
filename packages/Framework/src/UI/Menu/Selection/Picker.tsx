import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker as RNPicker } from '@react-native-picker/picker';

/******************************************************************************************************************
 * Picker option
 *
 * Defines a selectable option for the Picker component.
 *
 * @property label - Human-readable text shown in the dropdown
 * @property value - Internal value associated with the option
 ******************************************************************************************************************/
export type PickerOption = {
  label: string;
  value: string;
};

type PickerProps = {
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Picker component
 *
 * A styled dropdown picker built on top of @react-native-picker/picker.
 *
 * Features:
 * - Theming via react-native-paper
 * - Customizable options and labels
 * - Full-width responsive dropdown
 *
 * @usage
 * ```tsx
 * <Picker
 *   value={selected}
 *   options={[
 *     { label: 'Option A', value: 'a' },
 *     { label: 'Option B', value: 'b' },
 *   ]}
 *   onChange={(val) => setSelected(val)}
 * />
 * ```
 *
 * @param value - current selected value
 * @param options - array of PickerOption objects defining the dropdown items
 * @param onChange - callback to update selected value
 * @param style - optional style override
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const Picker: React.FC<PickerProps> = memo(({ 
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
