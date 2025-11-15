import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import * as Const from '../../../Const';
import { ChipOptionsType } from './ChipOptions.types';

/******************************************************************************************************************
 * ChipOptions implementation.
 ******************************************************************************************************************/
export const ChipOptions: ChipOptionsType = memo(
  ({ schema, onSelected, style }) => {
    const theme = useTheme();
    const [selectedSet, setSelectedSet] = useState<Set<string>>(
      () => new Set()
    );

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
      <View style={[styles.container, style]}>
        {Array.from(schema).map((value) => {
          const isSelected = selectedSet.has(value);
          return (
            <Chip
              key={value}
              selected={isSelected}
              showSelectedCheck={false}
              mode="outlined"
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primaryContainer
                    : theme.colors.backdrop,
                },
              ]}
              onPress={() => onChipSelected(value)}
            >
              {value}
            </Chip>
          );
        })}
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: Const.padSize05,
  },
});
