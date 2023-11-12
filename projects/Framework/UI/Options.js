import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4, iconSizeSmall } from '../Common/Values';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, RadioButton, Chip
} from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

/**
 * chip comp
 * @param toggledMap: map of toggled state for chip menu, { key<string>: value<bool> }
 * @param onChipSelected: takes in the key of the selectedMap when chip is pressed
 */
export const ChipsComp = ({
  toggledMap,
  onChipSelected,
}) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: padSize05 }}>
      {Object.keys(toggledMap).map((k) => {
        return <Chip key={k} selected={toggledMap[k]} showSelectedCheck={false} mode='outlined'
          style={{ margin: padSize05, backgroundColor: toggledMap[k] ? theme.colors.primaryContainer : theme.colors.backdrop }}
          onPress={() => onChipSelected(k)}>{k}</Chip>
      })}
    </View>
  );
};