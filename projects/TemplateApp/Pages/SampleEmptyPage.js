/***************************************************************************************
* copy paste empty page
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar
} from 'react-native-paper';
import { PageContainer, LinearLayout } from '../../../Framework/UI/index';

/**
 * sample empty page
 */
export default function SampleEmptyPage({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <PageContainer navigation={navigation} route={route} pageName="SampleEmptyPage">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </PageContainer>
  );
}