/***************************************************************************************
* copy paste empty screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
// UI
import { LinearLayout, ScreenLayout, Text } from '../../../Framework/Index/UI';

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