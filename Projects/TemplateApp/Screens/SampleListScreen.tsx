import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { Text } from 'react-native-paper';
import { ScreenProps } from '@screen';
import * as UI from '@ui';
import Const from '@const';
const _ = require('lodash');

/**
 * sample list screen
 */
const SampleListScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  return (
    <UI.Activity navigation={navigation} title="List Sample">
      {/* main content */}
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>
        <Text>asdfasdasd</Text>
      </UI.VerticalLayout>
    </UI.Activity>
  );
};

export default memo(SampleListScreen);