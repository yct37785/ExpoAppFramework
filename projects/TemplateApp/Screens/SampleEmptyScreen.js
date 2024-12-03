import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { BasicActivity, Text } from '../../../Framework/Index/UI';

/**
 * Sample empty screen, duplicate for quick start for new screens.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleEmptyScreen({ navigation, route }) {
  const { paramText } = route.params;

  return (
    <BasicActivity navigation={navigation} route={route} screenName="Empty Sample">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </BasicActivity>
  );
}

export default memo(SampleEmptyScreen);