import React, { JSX, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from './Screen';

type ActivityProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  title?: string;
  CustomHeader?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  isRootActivity?: boolean;
  children: React.ReactNode;
}

/******************************************************************************************************************
 * Activity component
 *
 * Provides a standardized screen layout with:
 * - An AppBar header
 * - Optional back navigation (hidden if marked as root activity)
 * - Optional screen title
 * - Slot for injecting custom header content (e.g. buttons, switches)
 * - Flexible body area for arbitrary child components
 *
 * Typical usage: wrap all screens in <Activity> to ensure consistent layout and navigation handling.
 * 
 * @param navigation - navigation prop for controlling stack navigation
 * @param title? - title string displayed in the AppBar
 * @param customHeaderContent? - function that renders custom header content (actions, toggles, etc.)
 * @param style? - additional style applied to the root container
 * @param isRootActivity? - if true, hides the back button (intended for the first/root screen)
 * @param children - content area of the screen
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const Activity: React.FC<ActivityProps> = memo(({
  navigation,
  title = '',
  CustomHeader,
  style = {},
  isRootActivity = false,
  children
}) => {
  return (
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        {!isRootActivity ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}
        <View style={{ flex: 1 }}>
          {CustomHeader && CustomHeader()}
        </View>
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
});
