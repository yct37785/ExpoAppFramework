import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { ScreenProps } from 'framework/core/screen.ts';

/**
 * hello screen
 */
const HelloScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello screen</Text>
    </View >
  );
};

export default memo(HelloScreen);