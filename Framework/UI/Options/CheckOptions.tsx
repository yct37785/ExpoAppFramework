import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import Const from '../../Const';
import { OptionContainer, OptionState, OptionSchema, OptionProps } from './OptionContainer';

/**
 * @param schema - JSON schema representing the menu options.
 * @param setSchema - setState function for schema.
 * @param style - Additional style on base container.
 */
export interface ICheckOptionCompProps {
    schema: OptionSchema;
    setSchema: (updatedSchema: OptionSchema) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * component for rendering checkbox options based on a JSON schema
 *  - supports nesting
 */
export const CheckOptions: React.FC<ICheckOptionCompProps> = memo(({ 
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
    <OptionContainer
      schema={schema}
      setSchema={setSchema}
      optionsContainer={optionsContainer}
      renderOption={renderCheckbox}
      depthPadding={Const.padSize2}
      style={style}
    />
  );
});