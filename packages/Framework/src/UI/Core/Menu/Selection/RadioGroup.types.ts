import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

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

/******************************************************************************************************************
 * RadioGroup props.
 * 
 * @property options        - Key/label pairs for the group
 * @property value          - Currently selected key
 * @property onValueChange  - Callback when a new option is selected
 * @property style?         - Optional container style
 ******************************************************************************************************************/
export type RadioGroupProps = {
  options: RadioGroupOptions;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a horizontal group of radio buttons with labels.
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
export type RadioGroupType = React.FC<RadioGroupProps>;
