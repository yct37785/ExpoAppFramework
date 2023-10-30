import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';
// data
import { LocalDataContext } from '../Contexts/LocalDataContext';

/**
 * sample empty page
 */
export default function SampleEmptyPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { localData, setLocalDataValue } = useContext(LocalDataContext);
  const { paramText } = route.params;

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (localData) {
      console.log(JSON.stringify(localData));
    }
  }, [localData]);

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Empty" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={{ flex: 1, padding: padSize }}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </View>
    </View>
  );
}