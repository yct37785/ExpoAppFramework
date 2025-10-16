import React, { memo, JSX } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Enum representing the three possible states of an option:
 * - Selected: option is checked/active
 * - Unselected: option is not checked/inactive
 * - Indeterminate: option has mixed child states (some selected, some unselected)
 ******************************************************************************************************************/
export enum OptionState {
  Selected = 1,
  Unselected = 2,
  Indeterminate = 3,
}

/******************************************************************************************************************
 * Describe the recursive tree schema for selectable options.
 * Each key corresponds to an option, which may itself contain nested children.
 ******************************************************************************************************************/
export type OptionSchema = Record<string, OptionProps>;

/******************************************************************************************************************
 * Describe a single option node within the schema.
 *
 * @property label    - Human-readable label for the option
 * @property state    - Current selection state
 * @property children - Optional nested child options
 ******************************************************************************************************************/
export type OptionProps = {
  label: string;
  state: OptionState;
  children?: OptionSchema;
};

/******************************************************************************************************************
 * BaseOptions props.
 * 
 * @property schema           - Current options tree
 * @property setSchema        - State setter invoked after mutations
 * @property optionsContainer - Wrapper component for child groups
 * @property renderOption     - Renderer for a single option row
 * @property depthPadding?    - Additional padding applied per hierarchy depth
 * @property style?           - Optional style for the root container
 ******************************************************************************************************************/
export type BaseOptionsProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  optionsContainer: React.FC<any>;
  renderOption: (props: { option: OptionProps; onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a recursive options tree with selection propagation and indeterminate aggregation.
 * Toggles a node, cascades to children, and recomputes ancestor states.
 *
 * @usage
 * ```tsx
 * <BaseOptions
 *   schema={schema}
 *   setSchema={setSchema}
 *   optionsContainer={({ children }) => <View>{children}</View>}
 *   renderOption={({ option, onPress }) => <MyOptionRow option={option} onPress={onPress} />}
 *   depthPadding={8}
 * />
 * ```
 ******************************************************************************************************************/
export type BaseOptions = React.FC<BaseOptionsProps>;
