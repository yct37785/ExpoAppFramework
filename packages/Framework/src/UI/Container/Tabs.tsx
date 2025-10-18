import React, { memo, JSX, useCallback, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Icon } from 'react-native-paper';
import * as Const from '../../Const';
import { TabView, TabBar, TabBarProps, SceneMap } from 'react-native-tab-view';
import { TabRouteProps, TabsContainerType } from './Tabs.types';

/******************************************************************************************************************
 * TabsContainer implementation (perf-tuned, MD3-aligned)
 ******************************************************************************************************************/
export const TabsContainer: TabsContainerType = memo(
  ({ routes, sceneMap, tabIndex, onTabIdxChange, position, style = {} }) => {
    const theme = useTheme();

    // memoized scene map
    const renderScene = useMemo(() => SceneMap(sceneMap as any), [sceneMap]);

    // Fallbacks so we don't rely on magic numbers if your Const isn't present
    const ripple = theme.dark ? Const?.rippleColorForDark ?? 'rgba(255,255,255,0.12)'
                              : Const?.rippleColorForLight ?? 'rgba(0,0,0,0.12)';

    /****************************************************************************************************************
     * lazy placeholder
     ****************************************************************************************************************/
    const loadingScreen = useCallback((): JSX.Element => <View style={{ flex: 1 }} />, []);

    /****************************************************************************************************************
     * tab icon renderer
     ****************************************************************************************************************/
    const renderIcon = useCallback(
      ({ route, color }: { route: TabRouteProps; color: string }): JSX.Element | null =>
        route.icon ? <Icon source={route.icon} size={Const?.iconSizeSmall} color={color} /> : null,
      []
    );

    /****************************************************************************************************************
     * styles
     ****************************************************************************************************************/
    const indicatorStyle = useMemo<StyleProp<ViewStyle>>(
      () => [{ backgroundColor: theme.colors.primary }],
      [theme.colors.primary]
    );
    const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
      () => [{ backgroundColor: theme.colors.surface }],
      [theme.colors.surface]
    );
    const labelStyle = useMemo(
      () => [{ color: theme.colors.onSurface }],
      [theme.colors.onSurface]
    );

    /****************************************************************************************************************
     * TabBar renderer (stable)
     ****************************************************************************************************************/
    const renderTabBar = useCallback(
      (props: any): JSX.Element => (
        <TabBar
          {...props}
          // renderIcon={({ route, focused, color }) => renderIcon({ route: route as TabRouteProps, color })}
          //pressColor={ripple}
          indicatorStyle={indicatorStyle}
          style={tabBarStyle}
          labelStyle={labelStyle}
        />
      ),
      [indicatorStyle, labelStyle, tabBarStyle, renderIcon, ripple]
    );

    return (
      <TabView
        lazy
        commonOptions={{
          icon: ({ route, focused, color }) => renderIcon({ route: route as TabRouteProps, color }),
        }}
        navigationState={{ index: tabIndex, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        renderLazyPlaceholder={loadingScreen}
        onIndexChange={onTabIdxChange}
        tabBarPosition={position}
        style={style}
      />
    );
  }
);
