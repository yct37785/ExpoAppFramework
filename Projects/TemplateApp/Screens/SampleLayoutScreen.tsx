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
      <UI.VerticalLayout constraint='scroll' style={{ backgroundColor: 'blue' }}>

        {/* VerticalLayout: wrap */}
        <Text variant="labelMedium">VerticalLayout: wrap</Text>
        <UI.VerticalLayout constraint='wrap' style={{ backgroundColor: 'red', height: 290 }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.VerticalLayout>

        {/* HorizontalLayout: wrap */}
        <Text variant="labelMedium">HorizontalLayout: wrap</Text>
        <UI.HorizontalLayout constraint='wrap' style={{ backgroundColor: 'red' }}>
          {[...Array(10)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* layouts nested */}
        <Text variant="labelMedium">Layouts nested</Text>
        <UI.HorizontalLayout constraint='wrap' style={{ backgroundColor: 'red' }}>
          <UI.VerticalLayout constraint='wrap' style={{ backgroundColor: 'yellow' }}>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
          <UI.HorizontalLayout constraint='wrap' style={{ backgroundColor: 'yellow' }}>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.HorizontalLayout>
        </UI.HorizontalLayout>

      </UI.VerticalLayout>
    </UI.Activity>
  );
};

export default memo(SampleLayoutScreen);