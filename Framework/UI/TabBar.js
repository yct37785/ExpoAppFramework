import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { padSize05, padSize, rippleColorForLight, rippleColorForDark, textColorForLight, textColorForDark } from '../Common/Common';
// UI
import {
  useTheme, Text
} from 'react-native-paper';
// tabs
import { TabView, TabBar } from 'react-native-tab-view';

/**
 * routes: [{ key: str, title: str }]
 * renderFuncs: [func]
 */
function TabBarComp({ routes, renderIcon, sceneMap, tabIndex, onTabIdxChange, position }) {
  const theme = useTheme();
  const textColor = theme.dark ? textColorForDark : textColorForLight;

  function loadingScreen() {
    return <View style={{ flex: 1 }}>
    </View>
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor={theme.dark ? rippleColorForDark : rippleColorForLight}
      indicatorStyle={{ backgroundColor: textColor }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ color: textColor }}
      renderIcon={({ route, focused, color }) => {
        if (route.icon) {
          return renderIcon({route, focused, color});
        } else {
          return null;
        }
      }}
      renderLabel={({ route, focused, color }) => {
        if (route.title) {
          return <Text style={{ color: textColor }}>{route.title}</Text>;
        } else {
          return null;
        }
      }}
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
      style={{ width: '100%' }}
    />
  )
}

export default React.memo(TabBarComp);