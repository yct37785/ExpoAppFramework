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
        <Appbar.Content title="Empty" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={{ flex: 1 }}>
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium">Modify and save local data</Text>
          <View style={{ marginTop: padSize2, padding: padSize }}>
            <Button icon="cookie" mode="contained" onPress={() => { }} style={{ marginBottom: padSize2 }}>trackers_sample.num + 1</Button>
            <View style={{ marginBottom: padSize2 }}>
              <TextInput
                label="trackers_sample.string"
                value={sampleUserInput}
                onChangeText={text => setSampleUserInput(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text variant="labelMedium" style={{ marginRight: padSize }}>Toogle dark mode</Text>
              <Switch value={false} onValueChange={() => { }} />
            </View>
          </View>
        </View>
        <Divider />
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium">Danger zone</Text>
          <View style={{ marginTop: padSize2, padding: padSize }}>
            <Button icon="trash-can" mode="contained" onPress={() => { }} style={{ marginBottom: padSize2 }}>delete data completely</Button>
          </View>
        </View>
        <Divider />
        <View style={{ padding: padSize }}>
          <Text variant="titleMedium" style={{ marginBottom: padSize2 }}>Data preview</Text>
          <Card mode='elevated'>
            <Card.Content>
              <Text variant="titleMedium">trackers_sample</Text>
              <Text variant="bodyMedium">num = 0</Text>
              <Text variant="bodyMedium">string = ""</Text>
            </Card.Content>
            <Card.Content>
              <Text variant="titleMedium">settings_sample</Text>
              <Text variant="bodyMedium">isDarkMode = true</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}