import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenProps } from '@screen';
import * as UI from '@ui';
import Const from '@const';

/**
 * sample layout screen
 */
const SampleLayoutScreen: React.FC<ScreenProps> = ({ navigation, route }) => {

  const BasicContainer: React.FC<{ i: number }> = ({ i }) => (
    <View style={{ width: 75, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <Text key={i}>item {1 + i}</Text>
    </View>
  );

  return (
    <UI.Activity navigation={navigation} title="Layout Sample">
      {/* VerticalLayout: scroll */}
      <Text variant="titleMedium">VerticalLayout: scroll</Text>
      <UI.VerticalLayout gap={Const.padSize} constraint='scroll'>

        {/* VerticalLayout: wrap */}
        <Text variant="labelMedium">VerticalLayout: wrap</Text>
        <UI.VerticalLayout gap={Const.padSize} constraint='wrap' style={{ backgroundColor: 'red', height: 290 }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.VerticalLayout>

        {/* HorizontalLayout: wrap */}
        <Text variant="labelMedium" style={{ marginTop: Const.padSize05 }}>HorizontalLayout: wrap</Text>
        <UI.HorizontalLayout gap={Const.padSize} constraint='wrap' style={{ backgroundColor: 'red' }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* GridLayout */}
        <Text variant="labelMedium" style={{ marginTop: Const.padSize05 }}>GridLayout</Text>
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
    </UI.Activity>
  );
};

export default memo(SampleLayoutScreen);