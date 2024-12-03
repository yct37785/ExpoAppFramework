import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Keyboard } from 'react-native';
import { padSize, padSize2 } from '../../../Framework/Index/CommonVals';
import { Card } from 'react-native-paper';
import { VerticalLayout, BasicActivity, SwitchToggle, Button, Text } from '../../../Framework/Index/UI';
import { LocalDataContext, useLocalDataUpdate } from '../../../Framework/Index/Hooks';

/**
 * Sample local data screen, demo local data management.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleLocalDataScreen({ navigation, route }) {
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

export default memo(SampleLocalDataScreen);