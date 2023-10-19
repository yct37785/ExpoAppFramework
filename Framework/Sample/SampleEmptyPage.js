import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
// data
import { DataContext } from '../Common/DataContext';

/**
 * sample empty page
 */
export default function SampleEmptyPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const searchBarRef = useRef();
  const { userData, setUserData } = React.useContext(DataContext);
  const { paramText } = route.params;

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
      <View style={{ width: '100%', flex: 1, padding: padSize }}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </View>
    </View>
  );
}