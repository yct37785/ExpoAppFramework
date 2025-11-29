import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../../Const';
import { OptionState, OptionProps } from './BaseOptions.types';
import { CheckOptionsType } from './CheckOptions.types';
import { BaseOptions } from './BaseOptions';

/******************************************************************************************************************
 * Simple container for grouping child options (stable component type).
 ******************************************************************************************************************/
const OptionsContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <View>{children}</View>;

/******************************************************************************************************************
 * CheckOptions implementation.
 ******************************************************************************************************************/
export const CheckOptions: CheckOptionsType = memo(
  ({ schema, setSchema, style }) => {
    /**
     * renders a single checkbox option
     */
    const renderCheckbox = ({
      option,
      onPress,
    }: {
      option: OptionProps;
      onPress: () => void;
    }) => {
      const status =
        option.state === OptionState.Selected
          ? 'checked'
          : option.state === OptionState.Unselected
          ? 'unchecked'
          : 'indeterminate';

      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.row}>
            <Checkbox status={status} />
            <Text>{option.label}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <BaseOptions
        schema={schema}
        setSchema={setSchema}
        optionsContainer={OptionsContainer}
        renderOption={renderCheckbox}
        depthPadding={Const.padSize2}
        style={style}
      />
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
