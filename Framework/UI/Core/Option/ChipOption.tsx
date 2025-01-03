import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import { padSize025, padSize05, padSize, padSize2 } from '../../../Index/Const';
import OptionComp, { IOptionProps, onOptionSelectionChangeFunc, OptionState } from './OptionComp';

/**
 * ChipOption component props
 * 
 * @param schema - JSON schema representing the menu options. Refer to OptionComp @example.
 * @param onSelectionChange - Callback function to handle selection changes.
 * @param style - Additional style on base container.
 */
export interface IChipOptionCompProps {
  schema: Record<string, IOptionProps>;
  onSelectionChange: onOptionSelectionChangeFunc;
  style?: StyleProp<ViewStyle>;
}

/**
 * ChipOption component for rendering chip options based on a JSON schema. Does not support nesting.
 */
const ChipOption: React.FC<IChipOptionCompProps> = ({
  schema,
  onSelectionChange,
  style = {},
}) => {
  const theme = useTheme();

  // render chip for each option
  const renderChip = ({ option, onPress }: { option: IOptionProps; onPress: () => void }) => (
    <Chip
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
      onPress={onPress}
    >
      {option.label}
    </Chip>
  );

  // container for the options, wrapping them in a row with wrapping enabled
  const optionsContainer = ({ children }: { children: React.ReactNode }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {children}
    </View>
  );

  return (
    <OptionComp
      originalSchema={schema}
      onSelectionChange={onSelectionChange}
      optionsContainer={optionsContainer}
      renderOption={renderChip}
      style={style}
    />
  );
}

export default memo(ChipOption);