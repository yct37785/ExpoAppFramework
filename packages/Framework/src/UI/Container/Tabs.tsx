import React, { memo, JSX, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import * as Const from '../../Const';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';

/******************************************************************************************************************
 * Describe the route object for each tab in the tabs container.
 *
 * @property key - unique identifier for the tab
 * @property title - display title for the tab
 * @property icon - optional material community icon name
 *
 * @usage
 * ```ts
 * const routes: TabRouteProps[] = [{ key: 'home', title: 'home', icon: 'home' }]
 * ```
 ******************************************************************************************************************/
export type TabRouteProps = {
  key: string;
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

/******************************************************************************************************************
 * Define the function signature that maps a tab route to its rendered scene.
 *
 * @param props - scene renderer props combined with the specific tab route
 *
 * @return - react node to render for the given tab
 *
 * @usage
 * ```ts
 * const renderScene: UI.TabsSceneMapFunc = ({ route, jumpTo }) => {
 *   switch (route.key) {
 *     case 'p1':
 *       return <Page1 />;
 *     case 'p2':
 *       return <Page2 />;
 *   }
 * }
 * ```
 ******************************************************************************************************************/
export type TabsSceneMapFunc = (props: SceneRendererProps & { route: TabRouteProps }) => ReactNode;

type TabsContainerProps = {
  routes: TabRouteProps[];
  sceneMap: TabsSceneMapFunc;
  tabIndex: number;
  onTabIdxChange: (index: number) => void;
  position: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a tabbed interface using react-native-tab-view with optional icons and lazy loading.
 *
 * @param props - tabs container props:
 *   - routes: TabRouteProps[] - array of tab definitions
 *   - sceneMap: TabsSceneMapFunc - function that renders a scene for a given route
 *   - tabIndex: number - index of the active tab
 *   - onTabIdxChange: (index: number) => void - callback when the active tab changes
 *   - position: 'top' | 'bottom' - tab bar position
 *   - style?: StyleProp<ViewStyle> - optional wrapper style for the tab view
 ******************************************************************************************************************/
export const TabsContainer: React.FC<TabsContainerProps> = memo(({
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
   * @return - jsx element used as the lazy placeholder
   ****************************************************************************************************************/
  function loadingScreen(): JSX.Element {
    return <View style={{ flex: 1 }} />;
  }

  /****************************************************************************************************************
   * Render a material community icon for the tab if one is defined on the route.
   *
   * @param route - tab route object that may include an icon name
   * @param focused - whether the tab is currently focused
   * @param color - color computed by the tab bar
   *
   * @return - jsx icon element or null when no icon is defined
   ****************************************************************************************************************/
  function renderIcon(route: TabRouteProps, focused: boolean, color: string): JSX.Element | null {
    return route.icon ? <Icon name={route.icon} size={15} color={color} /> : null;
  }

  /****************************************************************************************************************
   * Render a styled tab bar with theme-aware ripple, indicator, and label colors.
   *
   * @param props - tab bar renderer props from react-native-tab-view
   *
   * @return - jsx element that renders the tab bar
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
