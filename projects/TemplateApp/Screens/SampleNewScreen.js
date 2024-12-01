/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { ScreenLayout, Text } from '../../../Framework/Index/UI';
import { VerticalLayout, HorizontalLayout } from './TestLayouts';
// data
import { onLocalDataUpdate } from '../../../Framework/Index/Contexts';
// const
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleNewScreen = ({ navigation, route }) => {
  
  onLocalDataUpdate(() => {
    console.log("SampleNewScreen: updated local data");
  });

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Home Sample">
      <VerticalLayout>
        <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
        <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      </VerticalLayout>
      {/* LinearLayout */}
    </ScreenLayout>)
}

export default SampleNewScreen;