/***************************************************************************************
* copy paste empty screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
// UI
import {
  Text, Button, Appbar
} from 'react-native-paper';
import { LinearLayout, ScreenLayout } from '../../../Framework/Index/UI';

/**
 * sample empty screen
 */
export default function SampleEmptyScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const { paramText } = route.params;

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Empty Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </ScreenLayout>
  );
}