import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: Screen.ScreenType = ({ navigation, route }) => {

  const LeftContent = () => (
    <UI.HorizontalLayout backgroundColor='green'>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'lime' }} />
      <UI.Text variant="labelLarge" style={{ marginLeft: 8 }}>Testbed</UI.Text>
    </UI.HorizontalLayout>
  );

  return (
    <Screen.ScreenLayout LeftContent={LeftContent}>
      <UI.VerticalLayout constraint='scroll'>

        <UI.Touchable>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </UI.Touchable>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </TouchableOpacity>
        <Button mode='contained' onPress={() => { }}>
          asdasdsadasd
        </Button>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TestbedScreen);
