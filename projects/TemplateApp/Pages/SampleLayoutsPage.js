import React from 'react';
import { View } from 'react-native';
import { useTheme, Text, Appbar } from 'react-native-paper';
import Styles from '../../../Framework/Common/Styles';
import { VerticalLayout, HorizontalLayout } from '../../../Framework/UI/index';

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
    <View style={Styles.contPage}>
      {/* app header */}
      <ScreenHeaderComp navigation={navigation} route={route} />
      {/* main content here */}
      <VerticalLayout style={{ backgroundColor: 'green' }}>
        <HorizontalLayout>
          <Text>Horizontal Item 1</Text>
          <Text>Horizontal Item 2</Text>
        </HorizontalLayout>
        <HorizontalLayout>
          <Text>Horizontal Item 1</Text>
          <Text>Horizontal Item 2</Text>
        </HorizontalLayout>
      </VerticalLayout>
    </View>
  );
}
