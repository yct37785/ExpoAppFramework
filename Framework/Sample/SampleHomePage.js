import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from '../UI/Dialog';
import Picker from '../UI/Picker';
import DropdownMenu from '../UI/DropdownMenu';
import DropdownCheckMenu from '../UI/DropdownCheckMenu';
import TabBar from '../UI/TabBar';
// data
import { DataContext } from '../Common/DataContext';
// const

/**
 * Navigate between all the sample screens
 */
export default function SampleHomePage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { userData, setUserData } = React.useContext(DataContext);

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (userData) {
      console.log(JSON.stringify(userData));
    }
  }, [userData]);

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* main content here */}
      <View style={{ width: '100%', flex: 1, padding: padSize }}>
        <Text variant="bodyMedium">Hello world</Text>
      </View>
    </View>
  );
}