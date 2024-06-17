import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { VerticalLayout, HorizontalLayout, GridLayout, ScrollLayout, FrameLayout, RelativeLayout } from '../../../Framework/UI/index';
import Styles from '../../../Framework/Common/Styles';
import { padSize } from '../../../Framework/Common/Values';

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

  const TextContainer = ({ color, text }) => (
    <View style={{ backgroundColor: color, marginRight: padSize }}>
      <Text>{text}</Text>
    </View>
  );

  return (
    <View style={Styles.contPage}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <VerticalLayout style={{ backgroundColor: '#009900', padding: padSize }}>
        <Text>Vertical Layout</Text>
        <HorizontalLayout style={{ backgroundColor: '#991f00', padding: padSize }}>
          <TextContainer color="blue" text="Horizontal Item 1" />
          <TextContainer color="blue" text="Horizontal Item 2" />
        </HorizontalLayout>
        <GridLayout columns={4} style={{ backgroundColor: 'lightblue', marginTop: padSize, padding: padSize }}>
          <TextContainer color="blue" text="Grid Item 1" />
          <TextContainer color="blue" text="Grid Item 2" />
          <TextContainer color="blue" text="Grid Item 3" />
          <TextContainer color="blue" text="Grid Item 4" />
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
    </View>
  );
}