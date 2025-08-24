import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Core } from 'framework';

/******************************************************************************************************************
 * Hello screen
 ******************************************************************************************************************/
const HelloScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello screen</Text>
    </View >
  );
};

export default memo(HelloScreen);