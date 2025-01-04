import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import { padSize025, padSize05, padSize, padSize2 } from '../../../Index/Const';
import { OptionSchema, IOptionProps, OptionState } from './OptionComp';

/**
 * ChipOption component props
 * 
 * @param schema - JSON schema representing the menu options. Refer to OptionComp @example.
 * @param onSelectionChange - Callback function to handle selection changes.
 * @param style - Additional style on base container.
 */
export interface IChipOptionCompProps {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  onSelectionChange: (updatedSchema: OptionSchema) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * ChipOption component for rendering chip options based on a JSON schema. Does not support nesting.
 */
const ChipOption: React.FC<IChipOptionCompProps> = ({
  schema,
  setSchema,
  onSelectionChange,
  style = {},
}) => {
  const theme = useTheme();

  function onChipSelected(key: string) {
    if (key in schema) {
      const currState = schema[key].state;
      schema[key].state = currState === OptionState.Selected ? OptionState.Unselected : OptionState.Selected;
    }
    onSelectionChange(schema);
    setSchema({...schema});
  }

  const renderChip = (key: string, option: IOptionProps) => (
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
        margin: padSize05,
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
}

export default memo(ChipOption);