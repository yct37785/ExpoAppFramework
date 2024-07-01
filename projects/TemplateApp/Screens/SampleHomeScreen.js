/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import { LinearLayout, ScreenLayout } from '../../../Framework/Index/UI';
// data
import { onLocalDataUpdate } from '../../../Framework/Index/Contexts';
// const
import { SAMPLE_SCREENS } from '../User/Schemas';
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleHomeScreen = ({ navigation, route }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Home Sample">
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      {Object.keys(SAMPLE_SCREENS).map((key) => (
        <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
          {SAMPLE_SCREENS[key]}
        </Button>
      ))}
    </ScreenLayout>)
}

export default SampleHomeScreen;