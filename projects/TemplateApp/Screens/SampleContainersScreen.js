import React, { memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';

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
    <UI.BasicActivity navigation={navigation} route={route} screenName="Containers Sample">
      <UI.Text variant="bodyMedium">{`paramText: ${paramText}`}</UI.Text>
    </UI.BasicActivity>
  );
}

export default memo(SampleContainersScreen);