import React, { memo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../../Const';
import { OptionState, OptionSchema, OptionProps } from './BaseOptions.types';
import { CheckOptions } from './CheckOptions.types';

/******************************************************************************************************************
 * CheckOptions implementation.
 ******************************************************************************************************************/
export const CheckOptionsComp: CheckOptions = memo(({ schema, setSchema, style = {} }) => {
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
