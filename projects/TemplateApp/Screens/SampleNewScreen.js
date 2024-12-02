/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { ScreenLayout, Text } from '../../../Framework/Index/UI';
import { VerticalLayout, HorizontalLayout } from './TestLayouts';
// data
import { onLocalDataUpdate } from '../../../Framework/Index/Contexts';
// const
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleNewScreen = ({ navigation, route }) => {
  
  onLocalDataUpdate(() => {
    console.log("SampleNewScreen: updated local data");
  });

  const Container = ({ style }) => (
    <View style={[{ width: 50, height: 50, backgroundColor: 'green' }, style]} />
  );

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Home Sample">
      <VerticalLayout childMargin={10} padding={10}>
        <Container />
        <Container />
      </VerticalLayout>
      <HorizontalLayout childMargin={10} padding={10}>
        <Container />
        <Container />
      </HorizontalLayout>
    </ScreenLayout>)
}

export default SampleNewScreen;