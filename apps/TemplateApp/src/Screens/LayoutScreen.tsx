import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen, UI } from 'framework';

const tier1 = '#ff0000';
const tier2 = '#2eb82e';
const tier3 = '#ffff00';

/******************************************************************************************************************
 * Layouts demo
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = ({ navigation, route }) => {

   const BasicContainer: React.FC<{ i: number, backgroundColor?: string }> = ({ i, backgroundColor = tier2 }) => (
    <View style={{ width: 60, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor }}>
      <UI.Text key={i}>child {1 + i}</UI.Text>
    </View>
  );

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>

        {/* VerticalLayout: wrap (fills parent height) */}
        <UI.Text variant='labelLarge'>VerticalLayout: wrap</UI.Text>
        <UI.Text variant='labelMedium'>fills parent height, content wraps within</UI.Text>
        <View style={{ height: 190 }}>
          <UI.VerticalLayout constraint='wrap' backgroundColor={tier1}>
            {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
        </View>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelLarge'>HorizontalLayout: wrap</UI.Text>
        <UI.Text variant='labelMedium'>fills parent width, content wraps within</UI.Text>
        <UI.HorizontalLayout constraint='wrap' backgroundColor={tier1}>
          {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelLarge'>HorizontalLayout: scroll</UI.Text>
        <UI.Text variant='labelMedium'>fills parent width, content overflows within</UI.Text>
        <UI.HorizontalLayout constraint='scroll' backgroundColor={tier1}>
          {[...Array(8)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* layouts nested */}
        <UI.Text variant='labelLarge'>Layouts nested</UI.Text>
        <UI.HorizontalLayout constraint='none' backgroundColor={tier1}>
          <UI.VerticalLayout constraint='wrap' justify='center' flex={1} backgroundColor={tier2}>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} backgroundColor={tier3} />)}
          </UI.VerticalLayout>
          <UI.HorizontalLayout constraint='wrap' justify='center' flex={1} backgroundColor={tier2}>
            {[...Array(1)].map((e, i) => <BasicContainer key={i} i={i} backgroundColor={tier3} />)}
          </UI.HorizontalLayout>
        </UI.HorizontalLayout>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LayoutScreen);
