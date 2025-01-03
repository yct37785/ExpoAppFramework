import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';
import * as PropTypes from '../../../Framework/Index/PropTypes';

/**
 * Sample empty screen, duplicate for quick start for new screens.
 */
const SampleEmptyScreen: React.FC<PropTypes.IScreenProps> = ({ navigation, route }) => {
  const { paramText } = route.params;

  return (
    <UI.BasicActivity navigation={navigation} title="Empty Sample">
      <UI.Text variant="bodyMedium">{`paramText: ${paramText}`}</UI.Text>
    </UI.BasicActivity>
  );
}

export default memo(SampleEmptyScreen);