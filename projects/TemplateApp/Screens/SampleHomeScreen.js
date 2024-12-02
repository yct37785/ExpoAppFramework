/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { BasicActivity, Text, Button } from '../../../Framework/Index/UI';
// data
import { useLocalDataUpdate } from '../../../Framework/Index/Hooks';
// const
import { SAMPLE_SCREENS } from '../User/Schemas';
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleHomeScreen = ({ navigation, route }) => {
  
  useLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  return (
    <BasicActivity navigation={navigation} route={route} screenName="Home Sample">
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      {Object.keys(SAMPLE_SCREENS).map((key) => (
        <Button key={key} onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
          {SAMPLE_SCREENS[key]}
        </Button>
      ))}
    </BasicActivity>)
}

export default SampleHomeScreen;