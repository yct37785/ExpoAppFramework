import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import { LinearLayout } from '../../../Framework/UI/index';
// data
import { onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';
// const
import { SAMPLE_PAGES } from '../User/Schemas';
import { padSize } from '../../../Framework/Common/Values';

/**
 * sample home page
 */
const SampleHomePage = ({ navigation, route, screenHeaderComp: ScreenHeaderComp }) => {
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
    <LinearLayout>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} customHeaderComp={customHeaderContent} />
      {/* main content here */}
      <LinearLayout childMargin={padSize} style={{ padding: padSize }}>
        <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
        <LinearLayout childMargin={padSize}>
          {Object.keys(SAMPLE_PAGES).map((key) => (
            <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })}>
              {SAMPLE_PAGES[key]}
            </Button>
          ))}
        </LinearLayout>
      </LinearLayout>
    </LinearLayout>
  );
}

export default SampleHomePage;