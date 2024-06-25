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

  const TextContainer = ({ text, style, ...props }) => (
    <View style={[{ backgroundColor: '#be74c8' }, style]}>
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
        <LinearLayout childMargin={padSize} flex={0} align='horizontal' style={{ backgroundColor: '#78dd8d', padding: padSize }}>
          <TextContainer text="Horizontal Item 1" />
          <TextContainer text="Horizontal Item 2" />
        </LinearLayout>
        {/* horizontal layout: child = match parent */}
        <Text>horizontal layout: child = match parent</Text>
        <LinearLayout childMargin={padSize} flex={0} align='horizontal' childLayout = 'match-parent' style={{ backgroundColor: '#78dd8d', padding: padSize }}>
          <TextContainer text="Horizontal Item 1" />
          <TextContainer text="Horizontal Item 2" />
        </LinearLayout>
        {/* grid layout: child = wrap content */}
        <Text>grid layout: child = wrap content</Text>
        <GridLayout flex={0} childMargin={padSize} columns={4} childLayout = 'wrap-content' style={{ backgroundColor: '#78c9dd', padding: padSize }}>
          <TextContainer text="Grid Item 1" />
          <TextContainer text="Grid Item 2" />
          <TextContainer text="Grid Item 3" />
          <TextContainer text="Grid Item 4" />
          <TextContainer text="Grid Item 5" />
          <TextContainer text="Grid Item 6" />
        </GridLayout>
        {/* grid layout: child = match parent */}
        <Text>grid layout: child = match parent</Text>
        <GridLayout flex={0} childMargin={padSize} columns={4} childLayout = 'match-parent' style={{ backgroundColor: '#78c9dd', padding: padSize }}>
          <TextContainer text="Grid Item 1" />
          <TextContainer text="Grid Item 2" />
          <TextContainer text="Grid Item 3" />
          <TextContainer text="Grid Item 4" />
          <TextContainer text="Grid Item 5" />
          <TextContainer text="Grid Item 6" />
        </GridLayout>
        {/* vertical layout: child = wrap content */}
        <Text>vertical layout: child = wrap content</Text>
        <LinearLayout childMargin={padSize} flex={0} align='vertical' style={{ backgroundColor: '#d7dd78', padding: padSize }}>
          <TextContainer text="Horizontal Item 1" />
          <TextContainer text="Horizontal Item 2" />
        </LinearLayout>
        <View style={{ height: 1500, backgroundColor: '#ce7650', marginTop: padSize, padding: padSize }}>
          <Text variant="bodyLarge">scroll down...</Text>
          <Text variant="bodyMedium">down...</Text>
          <Text variant="bodySmall">down...</Text>
          <Text style={{ fontSize: 10 }}>down...</Text>
          <Text style={{ fontSize: 8 }}>down...</Text>
          <Text style={{ fontSize: 6 }}>down...</Text>
          <Text style={{ fontSize: 4 }}>down...</Text>
        </View>
      </LinearLayout>
    </LinearLayout>
  );
}