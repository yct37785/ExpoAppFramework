import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { padSize, padSize2 } from '../../../Framework/Common/Values';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, Switch, TextInput, Card
} from 'react-native-paper';
import { LinearLayout } from '../../../Framework/UI/index';
// data
import { LocalDataContext, onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';

/**
 * sample local data storage showcase page
 */
export default function SampleDataStoragePage({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;
  const { setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify } = useContext(LocalDataContext);

  onLocalDataUpdate(() => {
    console.log("SampleDataStoragePage: updated local data");
  });

  const updateTrackersSample = () => {
    const num = getLocalDataValue("trackers_sample.key1.num");
    setLocalDataValue([["trackers_sample.key1.num", num + 1]]);
  }

  const toggleDarkMode = () => {
    setLocalDataValue([["settings_sample.isDarkMode", !getLocalDataValue("settings_sample.isDarkMode")]]);
  }
  
  return (
    <LinearLayout flex={1} childLayout='wrap-content'>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <View style={Styles.contVert}>
        <View style={Styles.contPad}>
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
        <View style={[Styles.contPad, { marginBottom: padSize2 }]}>
          <Text variant="titleMedium">Change data schema</Text>
          <Text variant="bodyMedium">To test: close app, add additional values to schema and restart app</Text>
        </View>
        <Divider />
        <View style={Styles.contPad}>
          <Text variant="titleMedium" style={{ marginBottom: padSize2 }}>Data preview</Text>
          <Card mode='elevated'>
            <Card.Content>
              <Text variant="bodySmall">{getLocalDataStringify()}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </LinearLayout>
  );
}