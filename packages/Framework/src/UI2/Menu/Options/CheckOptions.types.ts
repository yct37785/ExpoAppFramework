import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../../Const';
import { OptionState, OptionSchema, OptionProps, BaseOptions } from './BaseOptions.types';

/******************************************************************************************************************
 * CheckOptions props.
 * 
 * @property schema     - Current options tree
 * @property setSchema  - State setter
 * @property style?     - Optional wrapper style
 ******************************************************************************************************************/
export type CheckOptionCompProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a checkbox-based UI for the options tree powered by BaseOptions.
 * Shows checked, unchecked, and indeterminate states with recursive nesting.
 *
 * @usage
 * ```tsx
 * <CheckOptions schema={schema} setSchema={setSchema} />
 * ```
 ******************************************************************************************************************/
export type CheckOptions = React.FC<CheckOptionCompProps>;
