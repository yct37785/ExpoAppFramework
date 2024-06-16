import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { VerticalLayout, HorizontalLayout, GridLayout, ScrollLayout, FrameLayout, RelativeLayout } from '../../../Framework/UI/index';
import Styles from '../../../Framework/Common/Styles';

/**
 * SampleLayoutsPage Component
 * 
 * Demonstrates various layout components.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @param {Function} props.screenHeaderComp - Function component to render the screen header.
 * @returns {JSX.Element} The SampleLayoutsPage component.
 */
export default function SampleLayoutsPage({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();

  return (
    <View style={Styles.contPage}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <ScrollLayout style={{ backgroundColor: theme.colors.background }}>
        <VerticalLayout style={{ backgroundColor: 'lightgreen', padding: 10 }}>
          <Text>Vertical Layout</Text>
          <HorizontalLayout style={{ backgroundColor: 'lightcoral', marginVertical: 10 }}>
            <Text>Horizontal Item 1</Text>
            <Text>Horizontal Item 2</Text>
          </HorizontalLayout>
          <GridLayout columns={3} style={{ backgroundColor: 'lightblue', marginVertical: 10 }}>
            <Text>Grid Item 1</Text>
            <Text>Grid Item 2</Text>
            <Text>Grid Item 3</Text>
            <Text>Grid Item 4</Text>
          </GridLayout>
          <FrameLayout style={{ backgroundColor: 'lightyellow', marginVertical: 10 }}>
            <Text style={{ position: 'absolute', top: 10, left: 10 }}>Frame Item 1</Text>
            <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>Frame Item 2</Text>
          </FrameLayout>
          <RelativeLayout style={{ backgroundColor: 'lightgray', marginVertical: 10 }}>
            <Text style={{ position: 'relative', top: 10, left: 10 }}>Relative Item 1</Text>
            <Text style={{ position: 'relative', bottom: 10, right: 10 }}>Relative Item 2</Text>
          </RelativeLayout>
        </VerticalLayout>
      </ScrollLayout>
    </View>
  );
}