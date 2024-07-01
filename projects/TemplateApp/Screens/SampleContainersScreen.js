/***************************************************************************************
* showcase container UI elements
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import { useTheme, Text } from 'react-native-paper';
import { LinearLayout, ScreenLayout } from '../../../Framework/UI/index';
import { padSize } from '../../../Framework/CommonVals';

/**
 * containers demos screen
 */
export default function SampleContainersScreen({ navigation, route }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Containers Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </ScreenLayout>
  );
}