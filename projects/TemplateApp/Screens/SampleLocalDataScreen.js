/***************************************************************************************
* showcase local data management
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { padSize, padSize2 } from '../../../Framework/CommonVals';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, Switch, TextInput, Card
} from 'react-native-paper';
import { LinearLayout, ScreenContainer } from '../../../Framework/UI/index';
// data
import { LocalDataContext, onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';

/**
 * sample local data management showcase screen
 */
export default function SampleLocalDataScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;
  const { setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify } = useContext(LocalDataContext);

  onLocalDataUpdate(() => {
    console.log("SampleLocalDataScreen: updated local data");
  });

  const updateTrackersSample = () => {
    const num = getLocalDataValue("trackers_sample.key1.num");
    setLocalDataValue([["trackers_sample.key1.num", num + 1]]);
  }

  const toggleDarkMode = () => {
    setLocalDataValue([["settings_sample.isDarkMode", !getLocalDataValue("settings_sample.isDarkMode")]]);
  }

  return (
    <ScreenContainer navigation={navigation} route={route} screemName="Local Data Sample">
      <LinearLayout childMargin={padSize}>
        <Text variant="titleMedium">Modify and save local data</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button mode="contained" onPress={() => updateTrackersSample()}>++trackers_sample.num</Button>
          <View style={{ alignItems: 'flex-start', flex: 1 }}>
            <Text variant="labelMedium">Toogle dark mode</Text>
            <Switch value={getLocalDataValue("settings_sample.isDarkMode")} onValueChange={() => toggleDarkMode()} />
          </View>
        </View>
        <Button icon="refresh" mode="contained" onPress={() => resetLocalData()}>reset data completely</Button>
      </LinearLayout>
      <LinearLayout>
        <Text variant="titleMedium">Change data schema</Text>
        <Text variant="bodyMedium">To test: close app, add additional values to schema and restart app</Text>
      </LinearLayout>
      <LinearLayout>
        <Text variant="titleMedium">Data preview</Text>
        <Card mode='elevated'>
          <Card.Content>
            <Text variant="bodySmall">{getLocalDataStringify()}</Text>
          </Card.Content>
        </Card>
      </LinearLayout>
    </ScreenContainer>
  );
}