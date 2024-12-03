import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';

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

  const BasicContainer = ({ i }) => (
    <View style={{ width: 75, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <UI.Text key={i}>item {1 + i}</UI.Text>
    </View>
  );

  return (
    <UI.BasicActivity navigation={navigation} route={route} screenName="Home Sample">
      {/* VerticalLayout: scroll */}
      <UI.Text variant="titleMedium">VerticalLayout: scroll</UI.Text>
      <UI.VerticalLayout childMargin={Const.padSize} constraint='scroll'>

        {/* VerticalLayout: wrap */}
        <UI.Text variant="labelMedium">VerticalLayout: wrap</UI.Text>
        <UI.VerticalLayout childMargin={Const.padSize} constraint='wrap' style={{ backgroundColor: 'red', height: 290 }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.VerticalLayout>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant="labelMedium" style={{ marginTop: Const.padSize05 }}>HorizontalLayout: wrap</UI.Text>
        <UI.HorizontalLayout childMargin={Const.padSize} constraint='wrap' style={{ backgroundColor: 'red' }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* GridLayout */}
        <UI.Text variant="labelMedium" style={{ marginTop: Const.padSize05 }}>GridLayout</UI.Text>
        <UI.GridLayout
          direction="row"
          reverse={false}
          alignment="centered"
          spacing={Const.padSize}
          itemsPerLine={3}
          style={{ backgroundColor: 'red', width: 350 }}
        >
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i />)}
        </UI.GridLayout>
      </UI.VerticalLayout>
    </UI.BasicActivity>)
}

export default memo(SampleLayoutsScreen);