/***************************************************************************************
* showcase layout UI elements
***************************************************************************************/
import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { LinearLayout, GridLayout, ScreenLayout } from '../../../Framework/UI/index';
import { padSize } from '../../../Framework/CommonVals';

/**
 * SampleLayoutsScreen Component
 * 
 * Demonstrates various layout components.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @param {Function} props.screenHeaderComp - Function component to render the screen header.
 * @returns {JSX.Element} The SampleLayoutsScreen component.
 */
export default function SampleLayoutsScreen({ navigation, route }) {
  const theme = useTheme();

  const TextContainer = ({ text, fontSize = 14, style, ...props }) => (
    <View style={[{ backgroundColor: '#be74c8', justifyContent: 'center' }, style]}>
      <Text style={{ fontSize: fontSize }}>{text}</Text>
    </View>
  );

  return (
    <ScreenLayout navigation={navigation} route={route} scrollable={true} screenName="Layouts Sample">
      {/* vertical layout */}
      <Text variant="titleMedium">ScreenContainer: vertical layout scrollable</Text>
      {/* horizontal layout: child = wrap content */}
      <Text>horizontal layout: child = wrap content</Text>
      <LinearLayout childMargin={padSize} flex={0} align='horizontal'>
        <TextContainer text="Horizontal Item 1" />
        <TextContainer text="Horizontal Item 2" />
      </LinearLayout>
      {/* horizontal layout: child = match parent */}
      <Text>horizontal layout: child = match parent</Text>
      <LinearLayout childMargin={padSize} flex={0} align='horizontal' childLayout='match-parent'>
        <TextContainer text="Horizontal Item 1" />
        <TextContainer text="Horizontal Item 2" />
      </LinearLayout>
      {/* horizontal layout: scrollable */}
      <Text>horizontal layout: child = scrollable</Text>
      <LinearLayout childMargin={padSize} flex={0} align='horizontal' childLayout='wrap-content' scrollable={true}>
        <TextContainer style={{ height: 80 }} text="Horizontal Item 1" />
        <TextContainer style={{ height: 80 }} text="Horizontal Item 2" />
        <TextContainer style={{ height: 80 }} text="Horizontal Item 3" />
        <TextContainer style={{ height: 80 }} text="Horizontal Item 4" />
      </LinearLayout>
      {/* grid layout: child = wrap content */}
      <Text>grid layout: child = wrap content</Text>
      <GridLayout flex={0} childMargin={padSize} columns={4} childLayout='wrap-content'>
        <TextContainer text="Grid Item 1" />
        <TextContainer text="Grid Item 2" />
        <TextContainer text="Grid Item 3" />
        <TextContainer text="Grid Item 4" />
        <TextContainer text="Grid Item 5" />
        <TextContainer text="Grid Item 6" />
      </GridLayout>
      {/* grid layout: child = match parent */}
      <Text>grid layout: child = match parent</Text>
      <GridLayout flex={0} childMargin={padSize} columns={4} childLayout='match-parent'>
        <TextContainer text="Grid Item 1" />
        <TextContainer text="Grid Item 2" />
        <TextContainer text="Grid Item 3" />
        <TextContainer text="Grid Item 4" />
        <TextContainer text="Grid Item 5" />
        <TextContainer text="Grid Item 6" />
      </GridLayout>
      {/* vertical layout: child = wrap content */}
      <Text>vertical layout: child = wrap content</Text>
      <LinearLayout childMargin={padSize} flex={0} align='vertical'>
        <TextContainer text="Horizontal Item 1" />
        <TextContainer text="Horizontal Item 2" />
      </LinearLayout>
      {/* vertical layout: fixed height */}
      <Text>vertical layout: fixed height</Text>
      <LinearLayout childMargin={padSize} style={{ height: 1500 }}>
        <TextContainer fontSize={16} text="scroll down..." />
        <TextContainer fontSize={14} text="down..." />
        <TextContainer fontSize={12} text="down..." />
        <TextContainer fontSize={10} text="down..." />
        <TextContainer fontSize={8} text="down..." />
        <TextContainer fontSize={6} text="down..." />
        <TextContainer fontSize={4} text="down..." />
        <View style={{ position: 'absolute', top: 500, left: 100, width: 200, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff66ff' }}>
          <Text>a random absolute position element</Text>
        </View>
      </LinearLayout>
    </ScreenLayout>
  );
}