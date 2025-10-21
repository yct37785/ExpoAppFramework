import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen, UI_Core } from 'framework';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: Screen.ScreenType = ({ navigation, route }) => {

  const LeftContent = () => (
    <UI_Core.HorizontalLayout backgroundColor='green'>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'lime' }} />
      <UI_Core.Text variant="labelLarge" style={{ marginLeft: 8 }}>Testbed</UI_Core.Text>
    </UI_Core.HorizontalLayout>
  );

  return (
    <Screen.ScreenLayout LeftContent={LeftContent}>
      <UI_Core.VerticalLayout constraint='scroll'>

        <UI_Core.Touchable>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </UI_Core.Touchable>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </TouchableOpacity>
        <Button mode='contained' onPress={() => { }}>
          asdasdsadasd
        </Button>

      </UI_Core.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TestbedScreen);
