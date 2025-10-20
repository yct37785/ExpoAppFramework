import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: Screen.ScreenType = ({ navigation, route }) => {

  function LeftContent() {
    return <View style={{ flex: 1, backgroundColor: 'green' }}>
      {/* <View style={{ width: 100, height: 100, backgroundColor: 'green' }}></View> */}
      {/* <UI.Text color='red'>Custom stuff here</UI.Text> */}
    </View>;
  }

  return (
    <Screen.ScreenWrapper LeftContent={LeftContent}>
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
    </Screen.ScreenWrapper>
  );
};

export default memo(TestbedScreen);
