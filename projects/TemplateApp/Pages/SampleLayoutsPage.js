import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { LinearLayout, GridLayout, ScrollLayout } from '../../../Framework/UI/index';
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
    <LinearLayout flex={1}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* vertical layout */}
      <View style={{ padding: padSize }}>
        <Text variant="headlineSmall">vertical layout: scrollable</Text>
      </View>
      <LinearLayout childMargin={padSize} align='vertical' scrollable={true} style={{ padding: padSize }}>
        {/* horizontal layout: child = wrap content */}
        <Text>horizontal layout: child = wrap content</Text>
        <LinearLayout childMargin={padSize} flex={0} align='horizontal' style={{ backgroundColor: '#991f00', padding: padSize }}>
          <TextContainer color="blue" text="Horizontal Item 1" />
          <TextContainer color="blue" text="Horizontal Item 2" />
        </LinearLayout>
        {/* horizontal layout: child = match parent */}
        <Text>horizontal layout: child = match parent</Text>
        <LinearLayout childMargin={padSize} flex={0} align='horizontal' childLayout = 'match-parent' style={{ backgroundColor: '#991f00', padding: padSize }}>
          <TextContainer color="blue" text="Horizontal Item 1" />
          <TextContainer color="blue" text="Horizontal Item 2" />
        </LinearLayout>
        {/* grid layout: child = wrap content */}
        <Text>grid layout: child = wrap content</Text>
        <GridLayout flex={0} childMargin={padSize} columns={4} childLayout = 'wrap-content' style={{ backgroundColor: 'lightblue', padding: padSize }}>
          <TextContainer color="blue" text="Grid Item 1" />
          <TextContainer color="blue" text="Grid Item 2" />
          <TextContainer color="blue" text="Grid Item 3" />
          <TextContainer color="blue" text="Grid Item 4" />
          <TextContainer color="blue" text="Grid Item 5" />
          <TextContainer color="blue" text="Grid Item 6" />
        </GridLayout>
        {/* grid layout: child = match parent */}
        <Text>grid layout: child = match parent</Text>
        <GridLayout flex={0} childMargin={padSize} columns={4} childLayout = 'match-parent' style={{ backgroundColor: 'lightblue', padding: padSize }}>
          <TextContainer color="blue" text="Grid Item 1" />
          <TextContainer color="blue" text="Grid Item 2" />
          <TextContainer color="blue" text="Grid Item 3" />
          <TextContainer color="blue" text="Grid Item 4" />
          <TextContainer color="blue" text="Grid Item 5" />
          <TextContainer color="blue" text="Grid Item 6" />
        </GridLayout>
        {/* vertical layout: child = wrap content */}
        <Text>vertical layout: child = wrap content</Text>
        <LinearLayout childMargin={padSize} flex={0} align='vertical' style={{ backgroundColor: '#991f00', padding: padSize }}>
          <TextContainer color="blue" text="Horizontal Item 1" />
          <TextContainer color="blue" text="Horizontal Item 2" />
        </LinearLayout>
        <View style={{ height: 1500, backgroundColor: 'green', marginTop: padSize }}></View>
      </LinearLayout>
    </LinearLayout>
  );
}