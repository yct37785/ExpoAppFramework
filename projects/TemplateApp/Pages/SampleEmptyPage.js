import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import Styles from '@expo-app-framework/framework/Common/Styles';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';
// data
import { LocalDataContext } from '@expo-app-framework/framework/Contexts/LocalDataContext';

/**
 * sample empty page
 */
export default function SampleEmptyPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { updateCount, setLocalDataValue } = useContext(LocalDataContext);
  const { paramText } = route.params;

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (updateCount) {
      console.log("SampleEmptyPage: updated data");
    }
  }, [updateCount]);

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={Styles.contPage}>
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Empty" >
        </Appbar.Content>
      </Appbar.Header>
      {/* main content here */}
      <View style={Styles.contVert}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </View>
    </View>
  );
}