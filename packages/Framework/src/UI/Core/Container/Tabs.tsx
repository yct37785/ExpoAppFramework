import React, { memo, JSX, useCallback, useMemo } from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme, Icon } from 'react-native-paper';
import * as Const from '../../../Const';
import { TabView, TabBar, TabBarProps, SceneMap } from 'react-native-tab-view';
import { TabRouteProps, TabsContainerType } from './Tabs.types';

/******************************************************************************************************************
 * TabsContainer implementation (perf-tuned, MD3-aligned)
 ******************************************************************************************************************/
export const TabsContainer: TabsContainerType = memo(
  ({ routes, sceneMap, tabIndex, onTabIdxChange, position, style }) => {
    const theme = useTheme();

    // memoized scene map
    const renderScene = useMemo(() => SceneMap(sceneMap as any), [sceneMap]);

    const ripple = theme.dark ? Const.rippleColorForDark : Const.rippleColorForLight;
    const onSurface = theme.colors.onSurface;

    /****************************************************************************************************************
     * lazy placeholder
     ****************************************************************************************************************/
    const renderLazyPlaceholder = () => <View style={{ flex: 1 }} />;

    /****************************************************************************************************************
     * tab icon renderer
     ****************************************************************************************************************/
    const renderIcon = ({
      route,
      color,
    }: {
      route: TabRouteProps;
      focused: boolean;
      color: string;
    }) =>
      route.icon ? (
        <Icon source={route.icon} size={Const.iconSizeSmall} color={color} />
      ) : null;

    /****************************************************************************************************************
     * TabBar renderer (stable)
     ****************************************************************************************************************/
    const renderTabBar = (props: any) => (
      <TabBar
        {...props}
        pressColor={ripple}
        indicatorStyle={{ backgroundColor: theme.colors.primary }}
        style={{
          backgroundColor: theme.colors.surface,
          elevation: theme.dark ? 0 : 2,
          borderBottomWidth: theme.dark ? 0.5 : 0,
          borderBottomColor: theme.dark ? theme.colors.outlineVariant : 'transparent',
        }}
        activeColor={onSurface}
        inactiveColor={onSurface}
        labelStyle={theme.fonts?.labelMedium ?? undefined}
      />
    );

    return (
      <TabView
        lazy
        commonOptions={{
          icon: ({ route, focused, color }) =>
            renderIcon({ route: route as TabRouteProps, focused, color }),
        }}
        navigationState={{ index: tabIndex, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        renderLazyPlaceholder={renderLazyPlaceholder}
        onIndexChange={onTabIdxChange}
        tabBarPosition={position}
        style={style}
      />
    );
  }
);
