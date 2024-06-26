import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import { useTheme, Text } from 'react-native-paper';
import { LinearLayout, PageContainer } from '../../../Framework/UI/index';
import { padSize } from '../../../Framework/Common/Values';

/**
 * containers demos page
 */
export default function SampleContainersPage({ navigation, route, screenHeaderComp }) {
  const theme = useTheme();
  const { paramText } = route.params;

  function customHeaderContent() {
    return (<Text>Custom Header</Text>)
  };

  return (
    <PageContainer navigation={navigation} route={route} screenHeaderComp={screenHeaderComp} pageName="SampleContainerPage" customHeaderContent={customHeaderContent}>
      <LinearLayout childMargin={padSize} style={{ padding: padSize }}>
        <Text variant="bodyMedium">{`paramText: ${paramText}`}</Text>
      </LinearLayout>
    </PageContainer>
  );
}