import React, { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SceneRendererProps } from 'react-native-tab-view';

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
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

/******************************************************************************************************************
 * Define the function signature that maps a tab route to its rendered scene.
 *
 * @param props - Scene renderer props combined with the specific tab route
 *
 * @return - React node to render for the given tab
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
  sceneMap: TabsSceneMapFunc;
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
export type TabsContainer = React.FC<TabsContainerProps>;
