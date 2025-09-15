import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

/******************************************************************************************************************
 * Define the set of selectable radio options for a group.
 * each key is the internal value and each value is the display label.
 *
 * @usage
 * ```ts
 * const options: RadioGroupOptions = { red: 'red', blue: 'blue', green: 'green' }
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
 * Render a horizontal group of radio buttons with labels.
 *
 * @param props - radio group props:
 *   - options: RadioGroupOptions - key/label pairs for the group
 *   - value: string - currently selected key
 *   - onValueChange: (value: string) => void - callback when a new option is selected
 *   - style?: StyleProp<ViewStyle> - optional container style
 *
 * @usage
 * ```tsx
 * <RadioGroup
 *   options={{ red: 'red', blue: 'blue', green: 'green' }}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 * ```
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
