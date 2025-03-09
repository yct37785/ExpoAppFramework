import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenProps } from '@screen';
import Activity from '@ui/Activity';

/**
 * sample empty screen, duplicate for quick start for new screens
 */
const SampleEmptyScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  function customHeaderContent() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Text>custom header content</Text>
    </View>
  }
  
  return (
    <Activity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Home Sample" isRootActivity={true}>
      <Text>hello</Text>
    </Activity>
  );
};

export default memo(SampleEmptyScreen);