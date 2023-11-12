import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '@expo-app-framework/framework/Common/Values';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
// data
import { LocalDataContext } from '@expo-app-framework/framework/Contexts/LocalDataContext';
// const
export const SAMPLE_PAGES = {
  tabs: "tabs example",
  menus: "menus example",
  empty: "empty example",
  search: "search example",
  storage: "storage example",
};

/**
 * sample home page
 */
export default function SampleHomePage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { updateCount, setLocalDataValue } = useContext(LocalDataContext);

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (updateCount) {
      console.log("SampleHomePage: updated data");
    }
  }, [updateCount]);

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Home" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={{ width: '100%', flex: 1, padding: padSize }}>
        <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
        <View style={{ flex: 1 }}>
          {Object.keys(SAMPLE_PAGES).map((key) => (
            <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })} style={{ margin: padSize }}>
              {SAMPLE_PAGES[key]}
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}