import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';

/**
 * Sample layouts screen, demo various layout configurations.
 */
const SampleLayoutsScreen: React.FC<UI.IScreenProps> = ({ navigation, route }) => {
  Hook.onLocalDataUpdate(() => {
    console.log("SampleNewScreen: updated local data");
  });

  const BasicContainer: React.FC<{ i: number }> = ({ i }) => (
    <View style={{ width: 75, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <UI.Text key={i}>item {1 + i}</UI.Text>
    </View>
  );

  return (
    <UI.BasicActivity navigation={navigation} title="Layouts Sample">
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
          spacing={Const.padSize}
          itemsPerLine={3}
          itemStyle = {{ backgroundColor: 'yellow' }}
          style={{ backgroundColor: 'red', width: 350 }}
        >
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.GridLayout>
      </UI.VerticalLayout>
    </UI.BasicActivity>)
}

export default memo(SampleLayoutsScreen);