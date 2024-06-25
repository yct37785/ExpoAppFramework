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
    <LinearLayout flex={1} childLayout='wrap-content'>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} customHeaderComp={customHeaderContent} />
      {/* main content here */}
      <View style={{ flex: 1, padding: padSize }}>
        <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
        <View style={{ flex: 1 }}>
          {Object.keys(SAMPLE_PAGES).map((key) => (
            <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })} style={{ margin: padSize }}>
              {SAMPLE_PAGES[key]}
            </Button>
          ))}
        </View>
      </View>
    </LinearLayout>
  );
}

export default SampleHomePage;