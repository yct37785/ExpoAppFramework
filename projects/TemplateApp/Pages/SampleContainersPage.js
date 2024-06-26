import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import { useTheme, Text } from 'react-native-paper';
import { PageContainer, LinearLayout } from '../../../Framework/UI/index';
import { padSize } from '../../../Framework/Common/Values';

/**
 * containers demos page
 */
export default function SampleContainersPage({ navigation, route }) {
  const theme = useTheme();
  const { paramText } = route.params;

  return (
    <PageContainer navigation={navigation} route={route} pageName="SampleContainerPage">
      <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
    </PageContainer>
  );
}