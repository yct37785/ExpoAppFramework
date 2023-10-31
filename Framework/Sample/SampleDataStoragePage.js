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
  const { localData, setLocalDataValue } = useContext(LocalDataContext);
  const { paramText } = route.params;
  const [sampleUserInput, setSampleUserInput] = useState("");

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (localData) {
      console.log(JSON.stringify(localData));
    }
  }, [localData]);

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
            <Button mode="contained" onPress={() => { }} style={{ marginRight: padSize2 }}>++trackers_sample.num</Button>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <Text variant="labelMedium" style={{ marginRight: padSize }}>Toogle dark mode</Text>
              <Switch value={false} onValueChange={() => { }} />
            </View>
          </View>
          <Button icon="trash-can" mode="contained" onPress={() => { }} style={{ marginBottom: padSize2 }}>delete data completely</Button>
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
              <Text variant="bodySmall">{JSON.stringify(localData, null, 2)}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}