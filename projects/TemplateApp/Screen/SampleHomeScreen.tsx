import React, { memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';
import * as PropTypes from '../../../Framework/Index/PropTypes';
import { ScreenNames } from '../User/ScreenMapper';

/**
 * Sample home screen.
 */
const SampleHomeScreen: React.FC<PropTypes.IScreenProps> = ({ navigation, route }) => {
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

  function renderScreenBtn(screen: ScreenNames, btnText: string) {
    return <UI.Button onPress={() => navigation.navigate(screen, { paramText: `hello ${screen} from home` })}>
      {btnText}
    </UI.Button>
  }

  return (
    <UI.BasicActivity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Home Sample">
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>
      <UI.Text variant="bodyMedium">Select the screen you want to navigate to</UI.Text>
        {renderScreenBtn(ScreenNames.TextInputBtn, "text input button example")}
        {renderScreenBtn(ScreenNames.Layouts, "layouts example")}
        {renderScreenBtn(ScreenNames.Containers, "containers example")}
        {renderScreenBtn(ScreenNames.Menus, "menus example")}
        {renderScreenBtn(ScreenNames.Empty, "empty example")}
        {renderScreenBtn(ScreenNames.DataDisplay, "data display example")}
      </UI.VerticalLayout>
    </UI.BasicActivity>)
};

export default memo(SampleHomeScreen);