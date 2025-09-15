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
 * Render a standardized screen layout with an appbar header (optional back button + title + custom content)
 * and a flexible body area for children.
 *
 * @param props - activity rendering props:
 *   - navigation: obj - stack navigation controller used for goBack() when not a root activity
 *   - title?: string - title text shown via appbar.content
 *   - CustomHeader?: fn - function that returns custom header nodes (e.g., buttons, toggles)
 *   - style?: obj - container viewstyle merged with { flex: 1 }
 *   - isRootActivity?: boolean - when true, hides the back button
 *   - children: ReactNode - body content rendered beneath the header
 *
 * @usage
 * ```tsx
 * <Activity
 *   navigation={navigation}
 *   title="details"
 *   CustomHeader={() => <HeaderActions />}
 * >
 *   <DetailsScreen />
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
