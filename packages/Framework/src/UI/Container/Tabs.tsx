import React, { memo, JSX, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import * as Const from '../../Const';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';

/******************************************************************************************************************
 * Tab route props
 *
 * Structure of the route object for each tab in the TabsContainer.
 *
 * @property key - unique identifier for the tab
 * @property title - display title for the tab
 * @property icon - optional MaterialCommunityIcons name for the tab icon
 ******************************************************************************************************************/
export type TabRouteProps = {
  key: string;
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

/******************************************************************************************************************
 * Tabs SceneMap function
 *
 * Function signature for mapping routes to their respective scene components.
 *
 * @param props - SceneRendererProps merged with the specific tab route
 * 
 * @returns ReactNode to render for the given tab
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
 * Tabs container component
 *
 * Component that renders a tabbed interface using react-native-tab-view.
 * - Supports icons, lazy loading, and custom themes.
 * - Can position the tab bar at the top or bottom.
 *
 * @param routes - array of tab route definitions
 * @param sceneMap - function mapping routes to their content
 * @param tabIndex - index of the currently active tab
 * @param onTabIdxChange - callback triggered when the tab index changes
 * @param position - tab bar position ('top' | 'bottom')
 * @param style - optional style for the base TabView container
 *
 * @returns JSX.Element
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

  /**
   * Renders a placeholder while scenes are lazily loaded.
   *
   * @returns JSX.Element
   */
  function loadingScreen(): JSX.Element {
    return <View style={{ flex: 1 }} />;
  }

  /**
   * Renders the icon for a given tab if defined.
   *
   * @param route - route object containing icon metadata
   * @param focused - whether the tab is currently focused
   * @param color - computed color for the icon
   *
   * @returns JSX.Element | null
   */
  function renderIcon(route: TabRouteProps, focused: boolean, color: string): JSX.Element | null {
    return route.icon ? <Icon name={route.icon} size={15} color={color} /> : null;
  }

  /**
   * Renders the tab bar with customized styles and ripple effects.
   *
   * @param props - props injected by react-native-tab-view's TabBar
   *
   * @returns JSX.Element
   */
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
