/***************************************************************************************
* showcase local data management
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { padSize, padSize2 } from '../../../Framework/Index/CommonVals';
// UI
import { Card } from 'react-native-paper';
import { VerticalLayout, BasicActivity, SwitchToggle, Button, Text } from '../../../Framework/Index/UI';
// data
import { LocalDataContext, useLocalDataUpdate } from '../../../Framework/Index/Hooks';

/**
 * sample local data management showcase screen
 */
export default function SampleLocalDataScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const { paramText } = route.params;
  const { setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify } = useContext(LocalDataContext);

  useLocalDataUpdate(() => {
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
    <BasicActivity navigation={navigation} route={route} screemName="Local Data Sample">
      <VerticalLayout>
        <Text variant="titleMedium">Modify and save local data</Text>
        <VerticalLayout>
          <Button mode="contained" onPress={() => updateTrackersSample()}>++trackers_sample.num</Button>
          <View>
            <Text variant="labelMedium">Toogle dark mode</Text>
            <SwitchToggle value={getLocalDataValue("settings_sample.isDarkMode")} onValueChange={() => toggleDarkMode()} />
          </View>
        </VerticalLayout>
        <Button icon="refresh" mode="contained" onPress={() => resetLocalData()}>reset data completely</Button>
      </VerticalLayout>
      <VerticalLayout>
        <Text variant="titleMedium">Change data schema</Text>
        <Text variant="bodyMedium">To test: close app, add additional values to schema and restart app</Text>
      </VerticalLayout>
      <VerticalLayout>
        <Text variant="titleMedium">Data preview</Text>
        <Card mode='elevated'>
          <Card.Content>
            <Text variant="bodySmall">{getLocalDataStringify()}</Text>
          </Card.Content>
        </Card>
      </VerticalLayout>
    </BasicActivity>
  );
}