import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { BasicActivity, VerticalLayout, Text, Button } from '../../../Framework/Index/UI';
import { useLocalDataUpdate } from '../../../Framework/Index/Hooks';
import { padSize } from '../../../Framework/Index/CommonVals';
import { SAMPLE_SCREENS } from '../User/Schemas';

/**
 * Sample home screen.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleHomeScreen({ navigation, route }) {
  
  useLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  return (
    <BasicActivity navigation={navigation} route={route} screenName="Home Sample">
      <VerticalLayout childMargin={padSize} padding={padSize}>
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      {Object.keys(SAMPLE_SCREENS).map((key) => (
        <Button key={key} onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
          {SAMPLE_SCREENS[key]}
        </Button>
      ))}
      </VerticalLayout>
    </BasicActivity>)
}

export default memo(SampleHomeScreen);