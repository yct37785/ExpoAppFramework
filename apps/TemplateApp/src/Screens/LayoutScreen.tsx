import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen, UI_Core } from 'framework';

/******************************************************************************************************************
 * Layouts demo
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = ({ navigation, route }) => {
   const BasicContainer: React.FC<{ i: number }> = ({ i }) => (
    <View style={{ width: 60, height: 75, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <UI_Core.Text key={i}>child {1 + i}</UI_Core.Text>
    </View>
  );

  return (
    <Screen.ScreenLayout>
      <UI_Core.VerticalLayout constraint='scroll' backgroundColor='blue'>

        {/* VerticalLayout: wrap (fills parent height) */}
        <UI_Core.Text variant='labelMedium'>VerticalLayout: wrap</UI_Core.Text>
        <UI_Core.Text variant='labelSmall'>fills parent height, content wraps within</UI_Core.Text>
        <View style={{ height: 190 }}>
          <UI_Core.VerticalLayout constraint='wrap' backgroundColor='red'>
            {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI_Core.VerticalLayout>
        </View>

        {/* HorizontalLayout: wrap */}
        <UI_Core.Text variant='labelMedium'>HorizontalLayout: wrap</UI_Core.Text>
        <UI_Core.Text variant='labelSmall'>fills parent width, content wraps within</UI_Core.Text>
        <UI_Core.HorizontalLayout constraint='wrap' backgroundColor='red'>
          {[...Array(7)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI_Core.HorizontalLayout>

        {/* HorizontalLayout: wrap */}
        <UI_Core.Text variant='labelMedium'>HorizontalLayout: scroll</UI_Core.Text>
        <UI_Core.Text variant='labelSmall'>fills parent width, content overflows within</UI_Core.Text>
        <UI_Core.HorizontalLayout constraint='scroll' backgroundColor='red'>
          {[...Array(8)].map((e, i) => <BasicContainer key={i} i={i} />)}
        </UI_Core.HorizontalLayout>

        {/* layouts nested */}
        <UI_Core.Text variant='labelMedium'>Layouts nested</UI_Core.Text>
        <UI_Core.HorizontalLayout constraint='none' backgroundColor='red'>
          <UI_Core.VerticalLayout constraint='wrap' justify='center' flex={1} backgroundColor='yellow'>
            {[...Array(2)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI_Core.VerticalLayout>
          <UI_Core.HorizontalLayout constraint='wrap' justify='center' flex={1} backgroundColor='yellow'>
            {[...Array(1)].map((e, i) => <BasicContainer key={i} i={i} />)}
          </UI_Core.HorizontalLayout>
        </UI_Core.HorizontalLayout>

      </UI_Core.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LayoutScreen);
