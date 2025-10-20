import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Layouts demo
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = ({ navigation, route }) => {
   const BasicContainer: React.FC<{ i: number }> = ({ i }) => (
    <View style={{ width: 60, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <UI.Text key={i}>child {1 + i}</UI.Text>
    </View>
  );

  return (
    <Screen.ScreenWrapper>
      <UI.VerticalLayout constraint='scroll' backgroundColor='blue'>

        {/* VerticalLayout: wrap (fills parent height) */}
        <UI.Text variant='labelMedium'>VerticalLayout: wrap</UI.Text>
        <UI.Text variant='labelSmall'>fills parent height, content wraps within</UI.Text>
        <View style={{ height: 190 }}>
          <UI.VerticalLayout constraint='wrap' backgroundColor='red'>
            {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
        </View>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelMedium'>HorizontalLayout: wrap</UI.Text>
        <UI.Text variant='labelSmall'>fills parent width, content wraps within</UI.Text>
        <UI.HorizontalLayout constraint='wrap' backgroundColor='red'>
          {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelMedium'>HorizontalLayout: scroll</UI.Text>
        <UI.Text variant='labelSmall'>fills parent width, content overflows within</UI.Text>
        <UI.HorizontalLayout constraint='scroll' backgroundColor='red'>
          {[...Array(8)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI.HorizontalLayout>

        {/* layouts nested */}
        <UI.Text variant='labelMedium'>Layouts nested</UI.Text>
        <UI.HorizontalLayout constraint='none' backgroundColor='red'>
          <UI.VerticalLayout constraint='wrap' justify='center' flex={1} backgroundColor='yellow'>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.VerticalLayout>
          <UI.HorizontalLayout constraint='wrap' justify='center' flex={1} backgroundColor='yellow'>
            {[...Array(1)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI.HorizontalLayout>
        </UI.HorizontalLayout>

      </UI.VerticalLayout>
    </Screen.ScreenWrapper>
  );
};

export default memo(LayoutScreen);
