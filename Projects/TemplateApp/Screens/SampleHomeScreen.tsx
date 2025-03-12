import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { ScreenProps } from '@screen';
import { useSettings } from '@hook/SettingsHook';
import * as UI from '@ui';
import Const from '@const';

/**
 * sample home screen
 */
const SampleHomeScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { settings, toggleDarkMode } = useSettings();

  function customHeaderContent() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch value={settings.isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  }

  function renderScreenBtn(screen: string, btnText: string) {
    return <Button mode="contained" onPress={() => navigation.navigate(screen, { paramText: `hello ${screen} from home` })}>
      {btnText}
    </Button>
  }
  
  return (
    <UI.Activity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Home Sample" isRootActivity={true}>
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>
        <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
        {renderScreenBtn("layout", "layouts example")}
        {renderScreenBtn("menu", "menus example")}
        {renderScreenBtn("list", "list example")}
        {renderScreenBtn("container", "container example")}
      </UI.VerticalLayout>
    </UI.Activity>
  );
};

export default memo(SampleHomeScreen);