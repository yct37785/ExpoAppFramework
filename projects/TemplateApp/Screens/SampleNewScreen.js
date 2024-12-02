/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { ScreenLayout, Text } from '../../../Framework/Index/UI';
import { VerticalLayout, HorizontalLayout, GridLayout } from './TestLayouts';
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
      <VerticalLayout childMargin={10} padding={0} style={{ backgroundColor: 'red' }}>
        <Container />
        <Container />
        <Container />
        <Container />
      </VerticalLayout>
      <HorizontalLayout childMargin={10} padding={0} style={{ backgroundColor: 'red' }}>
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
      </HorizontalLayout>
      <GridLayout
        direction="row"
        reverse={false}
        alignment="centered"
        spacing={10}
        itemsPerLine={3}
        style={{ margin: 10, backgroundColor: 'red' }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Text
            key={i}
            style={{
              backgroundColor: 'lightblue',
              textAlign: 'center',
              padding: 10,
            }}
          >
            Item {i + 1}
          </Text>
        ))}
      </GridLayout>
    </ScreenLayout>)
}

export default SampleNewScreen;