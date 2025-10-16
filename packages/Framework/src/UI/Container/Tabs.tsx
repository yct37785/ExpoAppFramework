import React, { memo, JSX } from 'react';
import { View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import * as Const from '../../Const';
import { TabView, TabBar } from 'react-native-tab-view';
import { TabRouteProps, TabsContainerType } from './Tabs.types';

/******************************************************************************************************************
 * TabsContainerComp implementation.
 ******************************************************************************************************************/
export const TabsContainer: TabsContainerType = memo(({
  routes,
  sceneMap,
  tabIndex,
  onTabIdxChange,
  position,
  style = {},
}) => {
  const theme = useTheme();
  const textColor = theme.dark ? Const.textColorForDark : Const.textColorForLight;

  /****************************************************************************************************************
   * Render an empty placeholder while tab scenes are lazily loaded.
   *
   * @return - JSX element used as the lazy placeholder
   ****************************************************************************************************************/
  function loadingScreen(): JSX.Element {
    return <View style={{ flex: 1 }} />;
  }

  /****************************************************************************************************************
   * Render a material community icon for the tab if one is defined on the route.
   *
   * @param route     - Tab route object that may include an icon name
   * @param focused   - Whether the tab is currently focused
   * @param color     - Color computed by the tab bar
   *
   * @return - JSX icon element or null when no icon is defined
   ****************************************************************************************************************/
  function renderIcon(route: TabRouteProps, focused: boolean, color: string): JSX.Element | null {
    return route.icon ? <Icon name={route.icon} size={15} color={color} /> : null;
  }

  /****************************************************************************************************************
   * Render a styled tab bar with theme-aware ripple, indicator, and label colors.
   *
   * @param props - Tab bar renderer props from react-native-tab-view
   *
   * @return - JSX element that renders the tab bar
   ****************************************************************************************************************/
  const renderTabBar = (props: any): JSX.Element => (
    <TabBar
      {...props}
      pressColor={theme.dark ? Const.rippleColorForDark : Const.rippleColorForLight}
      indicatorStyle={{ backgroundColor: textColor }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ color: textColor }}
    />
  );

  return (
    <TabView
      lazy
      commonOptions={{
        icon: ({ route, focused, color }) => renderIcon(route, focused, color),
      }}
      navigationState={{ index: tabIndex, routes }}
      renderTabBar={renderTabBar}
      renderScene={sceneMap}
      renderLazyPlaceholder={loadingScreen}
      onIndexChange={onTabIdxChange}
      tabBarPosition={position}
      style={style}
    />
  );
});
