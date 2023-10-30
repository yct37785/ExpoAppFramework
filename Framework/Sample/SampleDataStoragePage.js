import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, Switch, TextInput, Card
} from 'react-native-paper';
// data
import { DataContext } from '../Contexts/DataContext';

/**
 * sample local data storage showcase page
 */
export default function SampleDataStoragePage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { userData, setUserData } = React.useContext(DataContext);
  const { paramText } = route.params;
  const [sampleUserInput, setSampleUserInput] = useState("");

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
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Data Storage" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={{ flex: 1 }}>
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium">Modify and save local data</Text>
          <View style={{ marginTop: padSize2, padding: padSize }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button mode="contained" onPress={() => { }} style={{ marginBottom: padSize2, marginRight: padSize2, flex: 1 }}>++trackers_sample.num</Button>
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text variant="labelMedium" style={{ marginRight: padSize }}>Toogle dark mode</Text>
                <Switch value={false} onValueChange={() => { }} />
              </View>
            </View>
          </View>
        </View>
        <Divider />
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium">Change data schema</Text>
          <View style={{ marginTop: padSize2, padding: padSize }}>
            <View style={{ flexDirection: 'row' }}>
              <Button mode="contained" onPress={() => { }} style={{ marginBottom: padSize2, flex: 1, marginRight: padSize2 }}>+ nested data</Button>
              <Button mode="contained" onPress={() => { }} style={{ marginBottom: padSize2, flex: 1 }}>- nested data</Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button mode="contained" onPress={() => { }} style={{ marginBottom: padSize2, flex: 1, marginRight: padSize2 }}>+ root data</Button>
              <Button mode="contained" onPress={() => { }} style={{ marginBottom: padSize2, flex: 1 }}>- root data</Button>
            </View>
            <Button icon="trash-can" mode="contained" onPress={() => { }} style={{ marginBottom: padSize2 }}>delete data completely</Button>
          </View>
        </View>
        <Divider />
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium" style={{ marginBottom: padSize2 }}>Data preview</Text>
          <Card mode='elevated'>
            <Card.Content>
              <Text variant="bodySmall">{JSON.stringify(userData, null, 2)}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}