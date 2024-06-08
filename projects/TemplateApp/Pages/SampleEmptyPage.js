import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import Styles from '../../../Framework/Common/Styles';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';

/**
 * sample empty page
 */
export default function SampleEmptyPage({ navigation, route }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <View style={Styles.contPage}>
      {/* main content here */}
      <View style={Styles.contVert}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </View>
    </View>
  );
}