/***************************************************************************************
* showcase tab type container UI element
***************************************************************************************/
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearLayout, ScreenLayout, TabsContainer, Text } from '../../../Framework/Index/UI';

export const TAB_ROUTES = [
  { title: 'Page 1', key: 'p1', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

/**
 * Displays a sample screen with tab navigation.
 * 
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @returns {JSX.Element} The SampleTabsScreen component.
 */
export default function SampleTabsScreen({ navigation, route }) {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * Renders the icon for each tab.
   * 
   * @param {Object} param0 - Parameters including route, focused state, and color.
   * @param {Object} param0.route - The route object for the tab.
   * @param {boolean} param0.focused - Whether the tab is focused.
   * @param {string} param0.color - The color for the icon.
   * @returns {JSX.Element} The icon component for the tab.
   */
  function renderIcon({ route, focused, color }) {
    return <Icon name={route.icon} size={15} />;
  }

  /**
   * Renders the scene for each tab.
   * 
   * @param {Object} param0 - Parameters including the route.
   * @param {Object} param0.route - The route object for the tab.
   * @returns {JSX.Element|null} The component for the scene.
   */
  const renderScene = ({ navigation, route }) => {
    switch (route.key) {
      case 'p1':
        return <Tab1Comp />;
      case 'p2':
        return <Tab2Comp />;
      case 'p3':
        return <Tab3Comp />;
      default:
        return null;
    }
  };

  /**
   * Component for Tab 1.
   * 
   * @returns {JSX.Element} The component for Tab 1.
   */
  const Tab1Comp = () => {
    return <View style={{ flex: 1 }}><Text>P1</Text></View>;
  };

  /**
   * Component for Tab 2.
   * 
   * @returns {JSX.Element} The component for Tab 2.
   */
  const Tab2Comp = () => {
    return <View style={{ flex: 1 }}><Text>P2</Text></View>;
  };

  /**
   * Component for Tab 3.
   * 
   * @returns {JSX.Element} The component for Tab 3.
   */
  const Tab3Comp = () => {
    return <View style={{ flex: 1 }}><Text>P3</Text></View>;
  };

  return (
    <ScreenLayout navigation={navigation} route={route} applyPadding={false} screenName="Tabs Sample">
      <TabsContainer
        routes={TAB_ROUTES}
        renderIcon={renderIcon}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        sceneMap={renderScene}
        customLayout="match-parent" // special prop to set flex to 1 for elems with undefined height
      />
    </ScreenLayout>
  );
}
