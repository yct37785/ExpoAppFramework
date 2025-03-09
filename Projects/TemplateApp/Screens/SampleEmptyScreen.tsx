import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Text } from 'react-native';
import { ScreenProps } from '@screen/Screen';

/**
 * sample empty screen, duplicate for quick start for new screens
 */
const SampleEmptyScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Text>hello</Text>
    </View>
  );
};

export default memo(SampleEmptyScreen);