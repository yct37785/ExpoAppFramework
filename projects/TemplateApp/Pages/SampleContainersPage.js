import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';
import { LinearLayout } from '../../../Framework/UI/index';

/**
 * containers demos page
 */
export default function SampleContainersPage({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <LinearLayout flex={1} childLayout='wrap-content'>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <View style={Styles.contVert}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </View>
    </LinearLayout>
  );
}