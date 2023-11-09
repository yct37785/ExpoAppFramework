import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, Switch, TextInput, Card
} from 'react-native-paper';
// data
import { LocalDataContext } from '../Contexts/LocalDataContext';

/**
 * sample local data storage showcase page
 */
export default function SampleDataStoragePage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { updateCount, setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify } = useContext(LocalDataContext);
  const { paramText } = route.params;

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (updateCount) {
      console.log("SampleDataStoragePage: updated data");
    }
  }, [updateCount]);

  /**------------------------------------------------------------------------------------*
   * Values
   *------------------------------------------------------------------------------------*/
  const updateTrackersSample = () => {
    const num = getLocalDataValue("trackers_sample.key1.num");
    setLocalDataValue([["trackers_sample.key1.num", num + 1]]);
  }

  const toggleDarkMode = () => {
    setLocalDataValue([["settings_sample.isDarkMode", !getLocalDataValue("settings_sample.isDarkMode")]]);
  }

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Data Storage" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={{ flex: 1, padding: padSize }}>
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium" style={{ marginBottom: padSize }}>Modify and save local data</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: padSize }}>
            <Button mode="contained" onPress={() => updateTrackersSample()} style={{ marginRight: padSize2 }}>++trackers_sample.num</Button>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <Text variant="labelMedium" style={{ marginRight: padSize }}>Toogle dark mode</Text>
              <Switch value={getLocalDataValue("settings_sample.isDarkMode")} onValueChange={() => toggleDarkMode()} />
            </View>
          </View>
          <Button icon="refresh" mode="contained" onPress={() => resetLocalData()} style={{ marginBottom: padSize2 }}>reset data completely</Button>
        </View>
        <Divider />
        <View style={{ padding: padSize, marginBottom: padSize2 }}>
          <Text variant="titleMedium">Change data schema</Text>
          <Text variant="bodyMedium">To test: close app, add additional values to schema and restart app</Text>
        </View>
        <Divider />
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium" style={{ marginBottom: padSize2 }}>Data preview</Text>
          <Card mode='elevated'>
            <Card.Content>
              <Text variant="bodySmall">{getLocalDataStringify()}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}