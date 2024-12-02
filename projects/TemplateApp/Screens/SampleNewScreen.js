/***************************************************************************************
* home screen, the root screen
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { ScreenLayout, Text } from '../../../Framework/Index/UI';
import { VerticalLayout, HorizontalLayout, GridLayout } from '../../../Framework/Index/UI';
// data
import { useLocalDataUpdate } from '../../../Framework/Index/Hooks';
// const
import { padSize } from '../../../Framework/Index/CommonVals';

/**
 * sample home screen
 */
const SampleNewScreen = ({ navigation, route }) => {
  
  useLocalDataUpdate(() => {
    console.log("SampleNewScreen: updated local data");
  });

  const Container = ({ style }) => (
    <View style={[{ width: 50, height: 50, backgroundColor: 'green' }, style]} />
  );

  const TextContainer = ({ style, i }) => (
    <Text key={i}>Item {i + 1}</Text>
  );

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Home Sample">
      <VerticalLayout childMargin={10} padding={0} constraint='wrap' style={{ backgroundColor: 'red', height: 290 }}>
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
      </VerticalLayout>
      <HorizontalLayout childMargin={10} padding={0} constraint='wrap' style={{ backgroundColor: 'red' }}>
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
        style={{ backgroundColor: 'red', width: 300 }}
      >
        <TextContainer i={0} />
        <TextContainer i={1} />
        <TextContainer i={2} />
        <TextContainer i={3} />
        <TextContainer i={4} />
        <TextContainer i={5} />
        <TextContainer i={6} />
        <TextContainer i={7} />
        <TextContainer i={8} />
        <TextContainer i={9} />
      </GridLayout>
    </ScreenLayout>)
}

export default SampleNewScreen;