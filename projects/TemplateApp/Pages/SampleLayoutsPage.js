import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { LinearLayout, GridLayout, ScrollLayout } from '../../../Framework/UI/index';
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

  const TextContainer = ({ color, text, style, ...props }) => (
    <View style={[{ backgroundColor: color }, style]}>
      <Text>{text}</Text>
    </View>
  );

  return (
    <View style={Styles.contPage}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <LinearLayout align='vertical' childLayout='wrap-content' style={{ backgroundColor: '#009900', padding: padSize }}>
        <Text>Vertical Layout</Text>
        <LinearLayout flex={0} align='horizontal' childLayout = 'wrap-content' style={{ backgroundColor: '#991f00', padding: padSize }}>
          <TextContainer color="blue" text="Horizontal Item 1" />
          <TextContainer color="blue" text="Horizontal Item 2" />
        </LinearLayout>
        <GridLayout flex={0} columns={4} childLayout = 'wrap-content' style={{ backgroundColor: 'lightblue', marginTop: padSize, padding: padSize }}>
          <TextContainer color="blue" text="Grid Item 1" />
          <TextContainer color="blue" text="Grid Item 2" />
          <TextContainer color="blue" text="Grid Item 3" />
          <TextContainer color="blue" text="Grid Item 4" />
          <TextContainer color="blue" text="Grid Item 5" />
          <TextContainer color="blue" text="Grid Item 6" />
          <TextContainer color="blue" text="Grid Item 7" />
          <TextContainer color="blue" text="Grid Item 8" />
          <TextContainer color="blue" text="Grid Item 9" />
          <TextContainer color="blue" text="Grid Item 10" />
        </GridLayout>
        <LinearLayout align='vertical' style={{ backgroundColor: 'lightgray', marginTop: padSize }}>
          <TextContainer style={{ position: 'relative', top: 0, left: 0 }}  color="blue" text="Relative Item 1" />
          <TextContainer style={{ position: 'relative', bottom: 10, right: 10 }} color="yellow" text="Relative Item 2" />
        </LinearLayout>
      </LinearLayout>
    </View>
  );
}