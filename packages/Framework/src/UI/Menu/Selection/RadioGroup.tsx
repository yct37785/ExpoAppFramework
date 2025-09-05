import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

/******************************************************************************************************************
 * Radio group options
 *
 * Defines the set of selectable radio options.
 * Each key is the internal value, and each value is the human-readable label.
 *
 * @example:
 * ```ts
 * const options: RadioGroupOptions = {
 *   red: 'Red',
 *   blue: 'Blue',
 *   green: 'Green',
 * };
 * ```
 ******************************************************************************************************************/
export type RadioGroupOptions = {
  [key: string]: string;
};

type RadioGroupProps = {
  options: RadioGroupOptions;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Radio group component
 *
 * A simple horizontal group of radio buttons with labels.
 * Built on top of react-native-paper's <RadioButton.Group>.
 *
 * Features:
 * - Renders options dynamically from an object
 * - Displays labels alongside radio buttons
 * - Supports controlled selection state
 *
 * @usage
 * ```tsx
 * <RadioGroup
 *   options={{ red: 'Red', blue: 'Blue', green: 'Green' }}
 *   value={selectedColor}
 *   onValueChange={(val) => setSelectedColor(val)}
 * />
 * ```
 *
 * @param options - key/label pairs for the group
 * @param value - current selected key
 * @param onValueChange - Callback fired when a new option is selected
 * @param style - optional style override for the container
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const RadioGroup: React.FC<RadioGroupProps> = memo(({
  options,
  value,
  onValueChange,
  style = {},
}) => {
  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={[{ flexDirection: 'row' }, style]}>
        {Object.entries(options).map(([key, label], index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
            <Text>{label}</Text>
            <RadioButton value={key} />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
});
