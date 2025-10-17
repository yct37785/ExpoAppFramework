import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Core, UI } from 'framework';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  
  return (
    <Core.Activity navigation={navigation} title='Layout Sample'>
      <UI.VerticalLayout constraint='scroll'>
        
        <UI.Touchable>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </UI.Touchable>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
          </View>
        </TouchableOpacity>
        <Button mode='contained' onPress={() => {}}>
          asdasdsadasd
        </Button>

      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(TestbedScreen);