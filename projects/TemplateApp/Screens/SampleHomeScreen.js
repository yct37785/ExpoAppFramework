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
import { ScreenContainer, LinearLayout } from '../../../Framework/UI/index';
// data
import { onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';
// const
import { SAMPLE_SCREENS } from '../User/Schemas';
import { padSize } from '../../../Framework/CommonVals';

/**
 * sample home screen
 */
const SampleHomeScreen = ({ navigation, route }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  function customHeaderContent() {
    return <LinearLayout align='horizontal'>
      <Text>testing 1 2 3</Text>
    </LinearLayout>
  }

  return (
    <ScreenContainer navigation={navigation} route={route} screenName="Home Sample" customHeaderContent={customHeaderContent}>
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      {Object.keys(SAMPLE_SCREENS).map((key) => (
        <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
          {SAMPLE_SCREENS[key]}
        </Button>
      ))}
    </ScreenContainer>)
}

export default SampleHomeScreen;