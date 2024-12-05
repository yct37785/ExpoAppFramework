import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { SAMPLE_SCREENS } from '../User/Schemas';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';

/**
 * Sample home screen.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleHomeScreen({ navigation, route }) {
  
  Hooks.useLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  return (
    <UI.BasicActivity navigation={navigation} route={route} title="Home Sample">
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>
      <UI.Text variant="bodyMedium">Select the screen you want to navigate to</UI.Text>
      {Object.keys(SAMPLE_SCREENS).map((key) => (
        <UI.Button key={key} onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
          {SAMPLE_SCREENS[key]}
        </UI.Button>
      ))}
      </UI.VerticalLayout>
    </UI.BasicActivity>)
}

export default memo(SampleHomeScreen);