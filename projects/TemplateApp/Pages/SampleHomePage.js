import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import { LinearLayout, PageContainer } from '../../../Framework/UI/index';
// data
import { onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';
// const
import { SAMPLE_PAGES } from '../User/Schemas';
import { padSize } from '../../../Framework/Common/Values';

/**
 * sample home page
 */
const SampleHomePage = ({ navigation, route }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log("SampleHomePage: updated local data");
  });

  function customHeaderContent() {
    return <View style={{ flex: 1 }}>
      <Text>testing 1 2 3</Text>
    </View>
  }

  return (
    <PageContainer navigation={navigation} route={route} pageName="SampleHomePage" customHeaderContent={customHeaderContent}>
      <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
      <LinearLayout childMargin={padSize}>
        {Object.keys(SAMPLE_PAGES).map((key) => (
          <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
            {SAMPLE_PAGES[key]}
          </Button>
        ))}
      </LinearLayout>
    </PageContainer>)
}

export default SampleHomePage;