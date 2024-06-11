import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import { HorizontalLayout, VerticalLayout, GridLayout, ScrollLayout } from '../../../Framework/UI/Layouts/Layouts';

/**
 * SampleLayoutsPage Component
 * 
 * Demonstrates various layout components.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @returns {JSX.Element} The SampleLayoutsPage component.
 */
export default function SampleLayoutsPage({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();

  return (
    <VerticalLayout backgroundColor="yellow" size="fitParent" flex={1}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      <Text>asdasdasd</Text>
    </VerticalLayout>
  );
}
