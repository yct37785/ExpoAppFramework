import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import Styles from '@expo-app-framework/framework/Common/Styles';
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
    <View style={Styles.contPage}>
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Home" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={Styles.contVert}>
        <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
        <View style={Styles.contFlex}>
          {Object.keys(SAMPLE_PAGES).map((key) => (
            <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })} style={Styles.margin}>
              {SAMPLE_PAGES[key]}
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}