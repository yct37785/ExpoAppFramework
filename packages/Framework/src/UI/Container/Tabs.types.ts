import React, { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Describe the route object for each tab in the tabs container.
 *
 * @property key    - Unique identifier for the tab
 * @property title  - Display title for the tab
 * @property icon   - Optional material community icon name
 *
 * @usage
 * ```ts
 * const routes: TabRouteProps[] = [{ key: 'home', title: 'home', icon: 'home' }]
 * ```
 ******************************************************************************************************************/
export type TabRouteProps = {
  key: string;
  title?: string;
  icon?: string;
};

/******************************************************************************************************************
 * Tabs scene map (headless)
 *
 * A mapping of route keys → scene components, compatible with react-native-tab-view's SceneMap().
 *
 * @example
 * const scenes: TabsSceneMap = {
 *   music: MusicRoute,
 *   albums: AlbumsRoute,
 * };
 ******************************************************************************************************************/
export type TabsSceneMap<T extends string = string> = Record<T, React.ComponentType<unknown>>;

/******************************************************************************************************************
 * TabsContainer props.
 * 
 * @property routes         - Array of tab definitions
 * @property sceneMap       - Function that renders a scene for a given route
 * @property tabIndex       - Index of the active tab
 * @property onTabIdxChange - Callback when the active tab changes
 * @property position       - Tab bar position
 * @property style?         - Optional wrapper style for the tab view
 ******************************************************************************************************************/
export type TabsContainerProps = {
  routes: TabRouteProps[];
  sceneMap: TabsSceneMap;
  tabIndex: number;
  onTabIdxChange: (index: number) => void;
  position: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a tabbed interface using react-native-tab-view with optional icons and lazy loading.
 *
 * @param props - Refer to TabsContainerProps
 ******************************************************************************************************************/
export type TabsContainerType = React.FC<TabsContainerProps>;
