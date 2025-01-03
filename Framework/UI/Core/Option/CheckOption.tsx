import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Text } from '../Text/Text';
import { padSize, padSize2 } from '../../../Index/Const';
import OptionComp, { IOptionProps, onOptionSelectionChangeFunc, OptionState } from './OptionComp';

/**
 * Component for rendering checkbox options based on a JSON schema.
 *
 * @param schema - JSON schema representing the menu options. Refer to OptionComp @example.
 * @param onSelectionChange - Callback function to handle selection changes.
 * @param style - Additional style on base container.
 */
export interface ICheckOptionCompProps {
  schema: Record<string, IOptionProps>;
  onSelectionChange: onOptionSelectionChangeFunc;
  style?: StyleProp<ViewStyle>;
}

/**
 * CheckOption component for rendering check options based on a JSON schema. Supports nesting.
 */
const CheckOption: React.FC<ICheckOptionCompProps> = ({ 
  schema,
  onSelectionChange,
  style = {}
}) => {

  const renderCheckbox = ({ option, onPress }: { option: IOptionProps, onPress: () => void }) => {
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
    <OptionComp
      originalSchema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderCheckbox}
      depthPadding={padSize2}
      style={style}
    />
  );
}

export default memo(CheckOption);