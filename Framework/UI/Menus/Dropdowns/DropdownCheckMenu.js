import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme, Checkbox } from 'react-native-paper';
import { padSize05, padSize } from '../../../CommonVals';
import DropdownMenuComp from './DropdownMenu';

/**
 * triggerComp: comp
 * initialSelected: {}, object where keys = values of options
 * value: str, value of a selection
 * 
 * note, triggerComp should not take in an onPress callback or else it will override the option callbacks
 */
function DropdownCheckMenuComp({ triggerComp, initialSelected = {}, options, onPress, disabled = false, marginTop = 0,
  dir = 'column' }) {
  const [selected, setSelected] = useState(initialSelected);
  const width = dir === 'column' ? '100%' : 'auto';

  function drawItem(o, idx) {
    return <TouchableRipple style={{ width: width, padding: padSize }} key={idx}
      onPress={() => {
        const newSelected = { ...selected };
        if (o.value in newSelected) {
          delete newSelected[o.value];
        } else {
          newSelected[o.value] = 1;
        }
        setSelected(newSelected);
        onPress(o.value, idx, { ...newSelected });
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox status={o.value in selected ? 'checked' : 'unchecked'} />
        <Text style={{ marginLeft: padSize }}>{o.label}</Text>
      </View>
    </TouchableRipple>
  }

  function drawCheckboxComp() {
    return <View style={{ flexDirection: dir, flexWrap: 'wrap', width: '100%' }}>
      {
        options.map((o, idx) => {
          return drawItem(o, idx);
        })
      }
    </View>
  }

  return (
    <DropdownMenuComp
      triggerComp={triggerComp}
      options={[]}
      onPress={() => {}}
      disabled={disabled}
      marginTop={marginTop}
      dir={dir}
      drawCustomOptionComp={drawCheckboxComp}
    />
  )
}

export default React.memo(DropdownCheckMenuComp);