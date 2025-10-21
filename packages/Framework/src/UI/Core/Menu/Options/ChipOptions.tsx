import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import * as Const from '../../../../Const';
import { ChipOptionsType } from './ChipOptions.types';

/******************************************************************************************************************
 * ChipOptions implementation.
 ******************************************************************************************************************/
export const ChipOptions: ChipOptionsType = memo(({
  schema,
  onSelected,
  style = {},
}) => {
  const theme = useTheme();
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  /**
   * Handles chip toggle selection
   * - If value already selected → remove it
   * - If not selected → add it
   * - Updates local state and triggers onSelected callback
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
    <View style={[style, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {Array.from(schema).map((value) => (
        <Chip
          key={value}
          selected={selectedSet.has(value)}
          showSelectedCheck={false}
          mode='outlined'
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
