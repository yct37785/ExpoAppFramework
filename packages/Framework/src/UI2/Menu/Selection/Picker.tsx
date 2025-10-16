import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker as RNPicker } from '@react-native-picker/picker';

/******************************************************************************************************************
 * Define a selectable option for the picker.
 *
 * @property label - Human-readable text shown in the dropdown
 * @property value - Internal value associated with the option
 *
 * @usage
 * ```ts
 * const opts: PickerOption[] = [
 *   { label: 'option a', value: 'a' },
 *   { label: 'option b', value: 'b' },
 * ]
 * ```
 ******************************************************************************************************************/
export type PickerOption = {
  label: string;
  value: string;
};

/******************************************************************************************************************
 * Picker props.
 * 
 * @property value      - Current selected value
 * @property options    - Array of options to display
 * @property onChange   - Callback fired when selection changes
 * @property style?     - Optional style override for the picker
 ******************************************************************************************************************/
type PickerProps = {
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a styled dropdown picker built on @react-native-picker/picker.
 *
 * @param props - Refer to PickerProps
 * 
 * @usage
 * ```tsx
 * <Picker
 *   value={selected}
 *   options={[{ label: 'option a', value: 'a' }, { label: 'option b', value: 'b' }]}
 *   onChange={setSelected}
 * />
 * ```
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
