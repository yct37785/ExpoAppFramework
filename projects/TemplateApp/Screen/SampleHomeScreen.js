import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { SAMPLE_SCREENS } from '../User/Schema';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';

/**
 * Sample home screen.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided object containing route parameters.
 */
function SampleHomeScreen({ navigation, route }) {

  const {
    readLocalData,
    writeLocalData
  } = Hook.useLocalDataContext();

  const { toggleDarkMode } = Hook.useSystemSettingsContext();
  
  Hook.onLocalDataUpdate(() => {
    console.log("SampleHomeScreen: updated local data");
  });

  function customHeaderContent() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <UI.SwitchToggle value={readLocalData("isDarkMode")} onValueChange={toggleDarkMode} />
    </View>
  }

  return (
    <UI.BasicActivity navigation={navigation} route={route} customHeaderContent={customHeaderContent} title="Home Sample">
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