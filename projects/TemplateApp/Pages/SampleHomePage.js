import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import Styles from '../../../Framework/Common/Styles';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
// data
import { onLocalDataUpdate } from '../../../Framework/Contexts/LocalDataContext';
// const
import { SAMPLE_PAGES } from '../User/Schemas';

/**
 * sample home page
 */
const SampleHomePage = ({ navigation, route }) => {
  const theme = useTheme();

  onLocalDataUpdate(() => {
    console.log("SampleHomePage: updated local data");
  });

  return (
    <View style={Styles.contPage}>
      {/* main content here */}
      <View style={Styles.contVert}>
        <Text variant="bodyMedium">Select the pages you want to navigate to</Text>
        <View style={Styles.contFlex}>
          {Object.keys(SAMPLE_PAGES).map((key) => (
            <Button key={key} mode="contained" onPress={() => navigation.navigate(key, { paramText: `hello ${key} from home` })} style={Styles.margin}>
              {SAMPLE_PAGES[key]}
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}

// Optional: Add extra elements to the header
SampleHomePage.headerExtraElements = () => (
  <Appbar.Action icon="magnify" onPress={() => console.log('Search pressed')} />
);

export default SampleHomePage;