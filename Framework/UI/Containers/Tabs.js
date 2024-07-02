/*****************************************************************************************
 * tab type containers
*****************************************************************************************/
import React, { memo } from 'react';
import { View } from 'react-native';
import { padSize05, padSize, rippleColorForLight, rippleColorForDark, textColorForLight, textColorForDark } from '../../Index/CommonVals';
import { useTheme } from 'react-native-paper';
import { Text } from '../Text/Text';
import { TabView, TabBar } from 'react-native-tab-view';

/**
 * display children in tabs
 * 
 * @param {Object[]} routes - Array of route objects for the tabs.
 * @param {Function} renderIcon - Function to render the icon for each tab.
 * @param {Object} sceneMap - Object mapping route keys to their respective scenes.
 * @param {number} tabIndex - Index of the currently selected tab.
 * @param {Function} onTabIdxChange - Function to handle tab index changes.
 * @param {string} position - Position of the tab bar.
 * @returns {JSX.Element} The TabsContainer component.
 */
function TabsContainer({ routes, renderIcon, sceneMap, tabIndex, onTabIdxChange, position }) {
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
   * Renders the tab bar.
   * 
   * @param {Object} props - Props passed to the TabBar component.
   * @returns {JSX.Element} The TabBar component with customized styling and functionality.
   */
  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor={theme.dark ? rippleColorForDark : rippleColorForLight}
      indicatorStyle={{ backgroundColor: textColor }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ color: textColor }}
      renderIcon={({ route, focused, color }) => route.icon ? renderIcon({ route, focused, color }) : null}
      renderLabel={({ route, focused, color }) => route.title ? <Text style={{ color: textColor }}>{route.title}</Text> : null}
    />
  );

  return (
    <TabView
      lazy
      navigationState={{ index: tabIndex, routes }}
      renderTabBar={renderTabBar}
      renderScene={sceneMap}
      renderLazyPlaceholder={loadingScreen}
      onIndexChange={onTabIdxChange}
      tabBarPosition={position}
      style={{ width: '100%', backgroundColor: 'magenta' }}
    />
  );
}

export default memo(TabsContainer);
