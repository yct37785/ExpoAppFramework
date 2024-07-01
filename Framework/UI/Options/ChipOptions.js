import React, { memo } from 'react';
import { View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { padSize05 } from '../../Index/CommonVals';

/**
 * display options in chips form
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.toggledMap - Map of toggled state for chip menu, where key is the chip label and value is a boolean indicating if the chip is selected.
 * @param {Function} props.onChipSelected - Callback function to handle chip selection. Takes the key of the selected chip as a parameter.
 * @returns {JSX.Element} The ChipOptions component.
 */
const ChipOptions = ({
  toggledMap,
  onChipSelected,
}) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: padSize05 }}>
      {Object.keys(toggledMap).map((k) => (
        <Chip 
          key={k} 
          selected={toggledMap[k]} 
          showSelectedCheck={false} 
          mode='outlined'
          style={{ margin: padSize05, backgroundColor: toggledMap[k] ? theme.colors.primaryContainer : theme.colors.backdrop }}
          onPress={() => onChipSelected(k)}
        >
          {k}
        </Chip>
      ))}
    </View>
  );
};

export default memo(ChipOptions);