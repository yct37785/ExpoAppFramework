import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ScreenProps } from '@screen';
import Activity from '@ui/Activity';

/**
 * sample home screen
 */
const SampleHomeScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  function customHeaderContent() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Text>custom header content</Text>
    </View>
  }

  function renderScreenBtn(screen: string, btnText: string) {
    return <Button mode="contained" onPress={() => navigation.navigate(screen, { paramText: `hello ${screen} from home` })}>
      {btnText}
    </Button>
  }
  
  return (
    <Activity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Home Sample" isRootActivity={true}>
      <Text variant="bodyMedium">Select the screen you want to navigate to</Text>
      {renderScreenBtn("layout", "layouts example")}
    </Activity>
  );
};

export default memo(SampleHomeScreen);