/***************************************************************************************
* copy paste empty screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';
import { ScreenContainer, LinearLayout } from '../../../Framework/UI/index';

/**
 * sample empty screen
 */
export default function SampleEmptyScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <ScreenContainer navigation={navigation} route={route} screenName="Empty Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </ScreenContainer>
  );
}