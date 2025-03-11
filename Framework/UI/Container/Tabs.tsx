import React, { memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import Const from '../../Const';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';

/**
 * structure of route object for each tab
 */
export type TabRouteProps = {
  key: string;
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

/**
 * sceneMap func
 */
export type TabsSceneMapFunc = (props: SceneRendererProps & { route: TabRouteProps }) => ReactNode;

/**
 * @param routes - Array of route objects for the tabs.
 * @param sceneMap - Object mapping route keys to their respective scenes.
 * @param tabIndex - Index of the currently selected tab.
 * @param onTabIdxChange - Function to handle tab index changes.
 * @param position - Position of the tab bar.
 * @param style - Additional style on base container.
 */
type TabsContainerProps = {
  routes: TabRouteProps[];
  sceneMap: TabsSceneMapFunc;
  tabIndex: number;
  onTabIdxChange: (index: number) => void;
  position: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
}

/**
 * TabsContainer component, display children in tabs
 */
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
   * placeholder loading screen for lazy loading
   */
  function loadingScreen(): JSX.Element {
    return <View style={{ flex: 1 }} />;
  }
  
  /**
   * renders the icon for each tab
   * 
   * @param route - The route object for the tab.
   * @param focused - Whether the tab is focused.
   * @param color - The color for the icon.
   */
  function renderIcon(route: TabRouteProps, focused: boolean, color: string): JSX.Element | null {
    return route.icon ? <Icon name={route.icon} size={15} color={color} /> : null;
  }

  /**
   * renders the tab bar
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
