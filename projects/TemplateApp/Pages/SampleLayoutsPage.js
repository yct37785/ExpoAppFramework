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
export default function SampleLayoutsPage({ navigation, route }) {
  const theme = useTheme();

  return (
    <ScrollLayout backgroundColor={theme.colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Layouts Demo" />
      </Appbar.Header>

      <VerticalLayout backgroundColor={theme.colors.surface} size="fitParent" flex={1}>
        <Text variant="headlineMedium">Vertical Layout (fitParent, flex=1)</Text>
        
        <HorizontalLayout backgroundColor={theme.colors.primary} horizontalAlign="center" verticalAlign="center" flex={1}>
          <Text variant="bodyLarge">Horizontal Layout (center, flex=1)</Text>
        </HorizontalLayout>

        <GridLayout backgroundColor={theme.colors.accent} size="wrapContent" horizontalAlign="center" verticalAlign="center" flex={1}>
          <Text variant="bodyLarge">Grid Layout (wrapContent, flex=1)</Text>
          <View style={{ width: 100, height: 100, backgroundColor: theme.colors.background }} />
          <View style={{ width: 100, height: 100, backgroundColor: theme.colors.background }} />
          <View style={{ width: 100, height: 100, backgroundColor: theme.colors.background }} />
        </GridLayout>

        <VerticalLayout backgroundColor={theme.colors.notification} flex={2} verticalAlign="center">
          <Text variant="bodyLarge">Vertical Layout (flex=2)</Text>
        </VerticalLayout>

        <HorizontalLayout backgroundColor={theme.colors.surface} horizontalAlign="center" verticalAlign="center" flex={1}>
          <VerticalLayout backgroundColor={theme.colors.primary} flex={2} padding={8}>
            <Text variant="bodyLarge">Vertical Layout Flex 2</Text>
          </VerticalLayout>
          <VerticalLayout backgroundColor={theme.colors.accent} flex={1} padding={8}>
            <Text variant="bodyLarge">Vertical Layout Flex 1</Text>
          </VerticalLayout>
        </HorizontalLayout>
      </VerticalLayout>
    </ScrollLayout>
  );
}
