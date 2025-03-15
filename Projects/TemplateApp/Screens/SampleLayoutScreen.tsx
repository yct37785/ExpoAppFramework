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
        <View style={{ height: 190 }}>
          <UI.VerticalLayout constraint='wrap' style={{ backgroundColor: 'red' }}>
            {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
        </View>

        {/* HorizontalLayout: wrap */}
        <Text variant="labelMedium">HorizontalLayout: wrap</Text>
        <UI.HorizontalLayout constraint='wrap' style={{ backgroundColor: 'red' }}>
          {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* HorizontalLayout: wrap */}
        <Text variant="labelMedium">HorizontalLayout: scroll</Text>
        <UI.HorizontalLayout constraint='scroll' style={{ backgroundColor: 'red' }}>
          {[...Array(5)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* layouts nested */}
        <Text variant="labelMedium">Layouts nested (align: center)</Text>
        <UI.HorizontalLayout constraint='none' style={{ backgroundColor: 'red', height: 250 }}>
          <UI.VerticalLayout constraint='wrap' justify='center' style={{ backgroundColor: 'yellow', flex: 1 }}>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
          <UI.HorizontalLayout constraint='wrap' justify='center' style={{ backgroundColor: 'yellow', flex: 1 }}>
            {[...Array(1)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.HorizontalLayout>
        </UI.HorizontalLayout>

      </UI.VerticalLayout>
    </UI.Activity>
  );
};

export default memo(SampleLayoutScreen);