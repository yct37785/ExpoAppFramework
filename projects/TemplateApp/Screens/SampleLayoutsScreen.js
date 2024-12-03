import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Common from '../../../Framework/Index/CommonVals';

/**
 * Sample layouts screen, demo various layout configurations.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleLayoutsScreen({ navigation, route }) {
  Hooks.useLocalDataUpdate(() => {
    console.log("SampleNewScreen: updated local data");
  });

  const Container = ({ style }) => (
    <View style={[{ width: 50, height: 50, backgroundColor: 'green' }, style]} />
  );

  const TextContainer = ({ style, i }) => (
    <UI.Text key={i}>Item {i + 1}</UI.Text>
  );

  return (
    <UI.BasicActivity navigation={navigation} route={route} screenName="Home Sample">
      <UI.VerticalLayout childMargin={Common.padSize} padding={0} constraint='wrap' style={{ backgroundColor: 'red', height: 290 }}>
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
      </UI.VerticalLayout>
      <UI.HorizontalLayout childMargin={Common.padSize} padding={0} constraint='wrap' style={{ backgroundColor: 'red' }}>
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
        <Container />
      </UI.HorizontalLayout>
      <UI.GridLayout
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
      </UI.GridLayout>
    </UI.BasicActivity>)
}

export default memo(SampleLayoutsScreen);