import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../const';
import { OptionState, OptionSchema, OptionProps, BaseOptions } from './baseOptions';

type CheckOptionCompProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Check options component
 *
 * UI implementation of BaseOptions that renders each option as a checkbox.
 * - Uses react-native-paper’s <Checkbox>
 * - Supports nested schemas with recursive rendering
 * - Shows indeterminate state when children differ
 *
 * @param schema - JSON schema representing the menu options
 * @param setSchema - callback for updating schema
 * @param style - additional style for the container
 ******************************************************************************************************************/
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(({ schema, setSchema, style = {} }) => {
  /**
   * renders a single checkbox option
   */
  const renderCheckbox = ({ option, onPress }: { option: OptionProps; onPress: () => void }) => {
    const status =
      option.state === OptionState.Selected
        ? 'checked'
        : option.state === OptionState.Unselected
        ? 'unchecked'
        : 'indeterminate';
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox status={status} />
          <Text>{option.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * simple wrapper for grouping child options
   */
  const optionsContainer = ({ children }: { children: React.ReactNode }) => <View>{children}</View>;

  return (
    <BaseOptions
      schema={schema}
      setSchema={setSchema}
      optionsContainer={optionsContainer}
      renderOption={renderCheckbox}
      depthPadding={Const.padSize2}
      style={style}
    />
  );
});
