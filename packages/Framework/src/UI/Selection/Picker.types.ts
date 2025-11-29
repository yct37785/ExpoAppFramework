import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

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
export type PickerProps = {
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A dropdown selector allowing the user to choose one value from a list.
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
export type PickerType = React.FC<PickerProps>;
