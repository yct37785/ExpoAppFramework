import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';

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
    <UI.BasicActivity navigation={navigation} route={route} title="Empty Sample">
      <UI.Text variant="bodyMedium">{`paramText: ${paramText}`}</UI.Text>
    </UI.BasicActivity>
  );
}

export default memo(SampleEmptyScreen);