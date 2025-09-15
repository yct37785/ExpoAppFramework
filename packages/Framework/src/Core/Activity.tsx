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
 * Provides a standardized screen layout with AppBar header, optional back navigation, optional title,
 * a slot for custom header content, and a flexible body area for arbitrary children.
 *
 * Typical usage: wrap all screens in <Activity> to ensure consistent layout and navigation handling.
 * 
 * @param props - Activity props:
 *   - navigation: obj - navigation controller for stack operations
 *   - title?: string - title text shown in the AppBar
 *   - CustomHeader?: fn - renders custom header content (e.g., buttons, toggles)
 *   - style?: obj - additional container style
 *   - isRootActivity?: boolean - when true, hides back button (root screen)
 *   - children: ReactNode - screen content
 * 
 * @usage
 * ```tsx
 * <Activity
 *   navigation={navigation}
 *   title="My Title"
 *   CustomHeader={() => <MyActions />}
 *   isRootActivity
 * >
 *   <ScreenBody />
 * </Activity>
 * ```
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
