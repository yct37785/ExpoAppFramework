import React, { memo } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { padSize05, padSize, rippleColorForLight, rippleColorForDark, textColorForLight, textColorForDark } from '../../../Index/Const';
import { useTheme } from 'react-native-paper';
import { Text } from '../Text/Text';
import { TabView, TabBar } from 'react-native-tab-view';

/**
 * Display children in tabs.
 * 
 * @param {Object[]} routes - Array of route objects for the tabs.
 * @param {Object} sceneMap - Object mapping route keys to their respective scenes.
 * @param {number} tabIndex - Index of the currently selected tab.
 * @param {Function} onTabIdxChange - Function to handle tab index changes.
 * @param {string} position - Position of the tab bar.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The TabsContainer component.
 */
function TabsContainer({
  routes,
  sceneMap,
  tabIndex,
  onTabIdxChange,
  position,
  style = {}
}) {
  const theme = useTheme();
  const textColor = theme.dark ? textColorForDark : textColorForLight;

  /**
   * Placeholder loading screen for lazy loading.
   * 
   * @returns {JSX.Element} An empty View.
   */
  function loadingScreen() {
    return <View style={{ flex: 1 }} />;
  }
  
  /**
   * Renders the icon for each tab.
   * 
   * @param {Object} param0 - Parameters including route, focused state, and color.
   * @param {Object} param0.route - The route object for the tab.
   * @param {boolean} param0.focused - Whether the tab is focused.
   * @param {string} param0.color - The color for the icon.
   * @returns {JSX.Element} The icon component for the tab.
   */
  function renderIcon(route, focused, color) {
    return route.icon ? <Icon name={route.icon} size={15} color={textColor} /> : null;
  }

  /**
   * Renders the tab bar.
   * 
   * @param {Object} props - Props passed to the TabBar component.
   * 
   * @returns {JSX.Element} The TabBar component with customized styling and functionality.
   */
  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor={theme.dark ? rippleColorForDark : rippleColorForLight}
      indicatorStyle={{ backgroundColor: textColor }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ color: textColor }}
      renderLabel={({ route, focused, color }) => route.title ? <Text style={{ color: textColor }}>{route.title}</Text> : null}
    />
  );

  return (
    <TabView
      lazy
      commonOptions={{
        icon: ({ route, focused, color }) => {
          return renderIcon(route, focused, color)
        },
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
}

export default memo(TabsContainer);
