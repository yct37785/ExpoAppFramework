import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import Const from '../../Const';

/**
 * @param schema - Set<string> of chip values (each string represents a chip).
 * @param onSelected - Callback returning a set of currently selected chips.
 * @param style - Additional style on base container.
 */
type ChipOptionsProps = {
  schema: Set<string>;
  onSelected: (selectedValues: Set<string>) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * ChipOption component for selecting filter chips
 */
export const ChipOptions: React.FC<ChipOptionsProps> = memo(({
  schema,
  onSelected,
  style = {},
}) => {
  const theme = useTheme();
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

   /**
    * handles chip selection toggle
    */
   function onChipSelected(value: string) {
    const updatedSet = new Set(selectedSet);
    if (updatedSet.has(value)) {
      updatedSet.delete(value);
    } else {
      updatedSet.add(value);
    }
    setSelectedSet(updatedSet);
    onSelected(updatedSet);
  }
  
  return (
    <View style={[style, { flexDirection: "row", flexWrap: "wrap" }]}>
      {Array.from(schema).map((value) => (
        <Chip
          key={value}
          selected={selectedSet.has(value)}
          showSelectedCheck={false}
          mode="outlined"
          style={{
            backgroundColor: selectedSet.has(value)
              ? theme.colors.primaryContainer
              : theme.colors.backdrop,
            margin: Const.padSize05,
          }}
          onPress={() => onChipSelected(value)}
        >
          {value}
        </Chip>
      ))}
    </View>
  );
});