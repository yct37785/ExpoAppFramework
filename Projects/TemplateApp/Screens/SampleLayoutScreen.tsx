import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenProps } from '@screen';
import Activity from '@ui/Activity';

/**
 * sample layout screen
 */
const SampleLayoutScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  return (
    <Activity navigation={navigation} title="Layout Sample">
      <Text>hello</Text>
    </Activity>
  );
};

export default memo(SampleLayoutScreen);