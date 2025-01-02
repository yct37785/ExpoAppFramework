import React, { useState, useContext, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import { Text } from '../Text/Text';
import { padSize025, padSize05, padSize, padSize2 } from '../../../Index/Const';
import OptionComp, { IOptionProps, onOptionSelectionChangeFunc } from './OptionComp';

/**
 * ChipOption component props
 * 
 * @param schema - JSON schema representing the menu options. Refer to OptionComp @example.
 * @param schema.label - The label for the menu option.
 * @param schema.children - Nested options for the menu.
 * @param onSelectionChange - Callback function to handle selection changes.
 * @param style - Additional style on base container.
 */
interface IChipOptionCompProps {
  schema: Record<string, IOptionProps>;
  onSelectionChange: onOptionSelectionChangeFunc;
  style?: StyleProp<ViewStyle>;
};

/**
 * ChipOption component for rendering chip options based on a JSON schema.
 */
const ChipOption: React.FC<IChipOptionCompProps> = ({
  schema,
  onSelectionChange,
  style = {},
}) => {
  const theme = useTheme();

  // render label for parent option
  const renderLabel = ({ option, onPress }: { option: IOptionProps; onPress: () => void }) => (
    <Text>{option.label}</Text>
  );

  // render chip for each option
  const renderChip = ({ option, onPress }) => (
    <Chip
      selected={option.state === 1}
      showSelectedCheck={false}
      mode='outlined'
      style={{ backgroundColor: option.state === 1 ? theme.colors.primaryContainer : theme.colors.backdrop, margin: padSize05 }}
      onPress={onPress}
    >
      {option.label}
    </Chip>
  );
  
  const optionsContainer = ({children}) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
      {children}
    </View>
  );

  return (
    <OptionComp
      originalSchema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderChip}
      style={style} />
  );
};

export default memo(ChipOption);