/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { LinearLayout, ScreenLayout, Text, Button } from '../../../Framework/Index/UI';
// data
import { onLocalDataUpdate } from '../../../Framework/Index/Contexts';
// const
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleHomeScreen = ({ navigation, route }) => {
  
  onLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Home Sample">
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
    </ScreenLayout>)
}

export default SampleHomeScreen;