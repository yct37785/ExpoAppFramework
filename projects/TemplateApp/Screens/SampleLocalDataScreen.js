import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Common from '../../../Framework/Index/CommonVals';

/**
 * Sample local data screen, demo local data management.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleLocalDataScreen({ navigation, route }) {
  const { setLocalDataValue, getLocalDataValue, resetLocalData, getLocalDataStringify } = useContext(Hooks.LocalDataContext);

  Hooks.useLocalDataUpdate(() => {
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
    <UI.BasicActivity navigation={navigation} route={route} screemName="Local Data Sample">
      <UI.VerticalLayout>
        <UI.Text variant="titleMedium">Modify and save local data</UI.Text>
        <UI.VerticalLayout>
          <UI.Button mode="contained" onPress={() => updateTrackersSample()}>++trackers_sample.num</UI.Button>
          <View>
            <UI.Text variant="labelMedium">Toogle dark mode</UI.Text>
            <UI.SwitchToggle value={getLocalDataValue("settings_sample.isDarkMode")} onValueChange={() => toggleDarkMode()} />
          </View>
        </UI.VerticalLayout>
        <UI.Button icon="refresh" mode="contained" onPress={() => resetLocalData()}>reset data completely</UI.Button>
      </UI.VerticalLayout>
      <UI.VerticalLayout>
        <UI.Text variant="titleMedium">Change data schema</UI.Text>
        <UI.Text variant="bodyMedium">To test: close app, add additional values to schema and restart app</UI.Text>
      </UI.VerticalLayout>
      <UI.VerticalLayout>
        <UI.Text variant="titleMedium">Data preview</UI.Text>
        <Card mode='elevated'>
          <Card.Content>
            <UI.Text variant="bodySmall">{getLocalDataStringify()}</UI.Text>
          </Card.Content>
        </Card>
      </UI.VerticalLayout>
    </UI.BasicActivity>
  );
}

export default memo(SampleLocalDataScreen);