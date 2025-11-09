import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen, UI } from 'framework';

const tier1 = '#ff0000';
const tier2 = '#2eb82e';
const tier3 = '#ffff00';
const small = 50;
const big = 80;

/******************************************************************************************************************
 * Layouts demo
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = ({ navigation, route }) => {

  const BasicContainer: React.FC<{ i: number, width: number, height: number, bgColor?: string }>
    = ({ i, width, height, bgColor = tier2 }) => (
      <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor }}>
        <UI.Text>child {i}</UI.Text>
      </View>
    );

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>

        {/* VerticalLayout: wrap (fills parent height) */}
        <UI.Text variant='labelLarge'>VerticalLayout: wrap</UI.Text>
        <UI.Text variant='labelMedium'>constraint: parent height</UI.Text>
        <View style={{ height: 190 }}>
          <UI.VerticalLayout constraint='wrap' bgColor={tier1}>
            <BasicContainer i={1} width={small} height={small} />
            <BasicContainer i={2} width={big} height={small} />
            <BasicContainer i={3} width={big} height={small} />
            <BasicContainer i={4} width={small} height={big} />
            <BasicContainer i={5} width={big} height={big} />
            <BasicContainer i={6} width={big} height={small} />
            <BasicContainer i={7} width={big} height={small} />
            <BasicContainer i={8} width={small} height={small} />
          </UI.VerticalLayout>
        </View>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelLarge'>HorizontalLayout: wrap</UI.Text>
        <UI.Text variant='labelMedium'>constraint: parent width</UI.Text>
        <UI.HorizontalLayout constraint='wrap' bgColor={tier1}>
            <BasicContainer i={1} width={small} height={small} />
            <BasicContainer i={2} width={small} height={big} />
            <BasicContainer i={3} width={small} height={small} />
            <BasicContainer i={4} width={big} height={big} />
            <BasicContainer i={5} width={big} height={small} />
            <BasicContainer i={6} width={small} height={small} />
            <BasicContainer i={7} width={small} height={big} />
            <BasicContainer i={8} width={small} height={small} />
        </UI.HorizontalLayout>

        {/* HorizontalLayout: wrap */}
        <UI.Text variant='labelLarge'>HorizontalLayout: scroll</UI.Text>
        <UI.Text variant='labelMedium'>constraint: none, overflow</UI.Text>
        <UI.HorizontalLayout constraint='scroll' bgColor={tier1}>
            <BasicContainer i={1} width={small} height={small} />
            <BasicContainer i={2} width={small} height={small} />
            <BasicContainer i={3} width={big} height={small} />
            <BasicContainer i={4} width={small} height={small} />
            <BasicContainer i={5} width={big} height={small} />
            <BasicContainer i={6} width={small} height={small} />
            <BasicContainer i={7} width={big} height={small} />
        </UI.HorizontalLayout>

        {/* grid */}
        <UI.Text variant='labelLarge'>Layouts nested</UI.Text>
        <UI.HorizontalLayout constraint='none' bgColor={tier1}>

          <UI.VerticalLayout constraint='wrap' justify='center' flex={1} bgColor={tier2}>
            <BasicContainer i={1} width={small} height={small} bgColor={tier3} />
          </UI.VerticalLayout>
          <UI.HorizontalLayout constraint='wrap' justify='center' flex={1} bgColor={tier2}>
            <BasicContainer i={1} width={small} height={small} bgColor={tier3} />
          </UI.HorizontalLayout>

        </UI.HorizontalLayout>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LayoutScreen);
