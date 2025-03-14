import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import Const from '../../Const';
import { OptionState, OptionSchema, OptionProps, BaseOptions } from './BaseOptions';

/**
 * @param schema - JSON schema representing the menu options.
 * @param setSchema - setState function for schema.
 * @param style - Additional style on base container.
 */
type CheckOptionCompProps = {
    schema: OptionSchema;
    setSchema: (updatedSchema: OptionSchema) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * component for rendering checkbox options based on a JSON schema
 *  - supports nesting
 */
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(({ 
  schema,
  setSchema,
  style = {}
}) => {

  const renderCheckbox = ({ option, onPress }: { option: OptionProps, onPress: () => void }) => {
    const status = option.state === OptionState.Selected ? 'checked' : option.state === OptionState.Unselected ? 'unchecked' : 'indeterminate';
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox status={status} />
          <Text>{option.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  const optionsContainer = ({ children }: { children: React.ReactNode }) => (
    <View>{children}</View>
  );

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