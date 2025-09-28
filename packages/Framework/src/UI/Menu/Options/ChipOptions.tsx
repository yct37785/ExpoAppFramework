import React, { memo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import * as Const from '../../../Const';

type ChipOptionsProps = {
  schema: Set<string>;
  onSelected: (selectedValues: Set<string>) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a selectable chip group with multi-select support using react-native-paper chips.
 *
 * Features:
 * - Supports multi-selection of chips
 * - Provides selected/unselected visual states
 * - Callback returns updated selected values as a Set<string>
 * - Responsive row wrapping for variable chip counts
 * 
 * @param props - Chip options props:
 *   - schema: Set<string>  - Available chip labels
 *   - onSelected: fn       - Callback receiving updated selection
 *   - style?: StyleProp    - Optional wrapper style
 *
 * @usage
 * ```tsx
 * <ChipOptions
 *   schema={new Set(['Apples', 'Bananas', 'Cherries'])}
 *   onSelected={(values) => console.log('Selected chips:', values)}
 * />
 * ```
 ******************************************************************************************************************/
export const ChipOptions: React.FC<ChipOptionsProps> = memo(({
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
