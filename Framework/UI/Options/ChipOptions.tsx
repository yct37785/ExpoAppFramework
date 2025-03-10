import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import Const from '../../Const';
import { OptionState, OptionSchema, OptionProps } from './BaseOptions';

/**
 * @param schema - JSON schema representing the menu options. Refer to OptionComp @example.
 * @param setSchema - setState function for schema.
 * @param style - Additional style on base container.
 */
type ChipOptionCompProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * ChipOption component for rendering chip options based on a JSON schema
 *  - does not support nesting
 */
export const ChipOptions: React.FC<ChipOptionCompProps> = memo(({
  schema,
  setSchema,
  style = {},
}) => {
  const theme = useTheme();

  function onChipSelected(key: string) {
    if (key in schema) {
      const currState = schema[key].state;
      schema[key].state = currState === OptionState.Selected ? OptionState.Unselected : OptionState.Selected;
    }
    setSchema({...schema});
  }

  const renderChip = (key: string, option: OptionProps) => (
    <Chip
      key={key}
      selected={option.state === OptionState.Selected}
      showSelectedCheck={false}
      mode="outlined"
      style={{
        backgroundColor:
          option.state === OptionState.Selected
            ? theme.colors.primaryContainer
            : theme.colors.backdrop,
        margin: Const.padSize05,
      }}
      onPress={(e) => onChipSelected(key)}
    >
      {option.label}
    </Chip>
  );
  
  return (
    <View style={[style, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {Object.keys(schema).map((key) => {
        return renderChip(key, schema[key])
      })}
    </View>
  );
});