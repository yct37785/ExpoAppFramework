import React, { memo } from 'react';
import { View } from 'react-native';
import { BasicActivity, Text } from '../../../Framework/Index/UI';
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * Containers demos screen.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleContainersScreen({ navigation, route }) {
  const { paramText } = route.params;

  return (
    <BasicActivity navigation={navigation} route={route} screenName="Containers Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </BasicActivity>
  );
}

export default memo(SampleContainersScreen);