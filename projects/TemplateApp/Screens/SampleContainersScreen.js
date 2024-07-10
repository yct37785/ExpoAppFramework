/***************************************************************************************
* showcase container UI elements
***************************************************************************************/
import React from 'react';
import { View } from 'react-native';
import { LinearLayout, ScreenLayout, Text } from '../../../Framework/Index/UI';
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * containers demos screen
 */
export default function SampleContainersScreen({ navigation, route }) {
  const { paramText } = route.params;

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Containers Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </ScreenLayout>
  );
}