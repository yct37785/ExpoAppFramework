import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { OptionSchema } from './BaseOptions.types';

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
export type CheckOptionsType = React.FC<CheckOptionCompProps>;
