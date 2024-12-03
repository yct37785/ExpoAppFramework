import React, { useState, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';

/**
 * Const defines.
 */
export const TAB_ROUTES = [
  { title: 'Collapsible', key: 'collapsible', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

/**
 * Sample containers screen, demo simple container UI.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleContainersScreen({ navigation, route }) {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * Renders the scene for each tab.
   * 
   * @param {Object} param0 - Parameters including the route.
   * @param {Object} param0.route - The route object for the tab.
   * @returns {JSX.Element|null} The component for the scene.
   */
  const renderScene = ({ navigation, route }) => {
    switch (route.key) {
      case 'collapsible':
        return <CollapsiblePage />;
      case 'p2':
        return <Tab2Page />;
      case 'p3':
        return <Tab3Page />;
      default:
        return null;
    }
  };

  /**
   * Collapsible containers demo.
   * 
   * @returns {JSX.Element} Collapsible containers page.
   */
  const CollapsiblePage = memo(() => {
    return <View style={{ flex: 1 }}><UI.Text>P1</UI.Text></View>;
  });

  /**
   * Component for page 2.
   * 
   * @returns {JSX.Element} The component for page 2.
   */
  const Tab2Page = memo(() => {
    return <View style={{ flex: 1 }}><UI.Text>P2</UI.Text></View>;
  });

  /**
   * Component for page 3.
   * 
   * @returns {JSX.Element} The component for page 3.
   */
  const Tab3Page = memo(() => {
    return <View style={{ flex: 1 }}><UI.Text>P3</UI.Text></View>;
  });

  return (
    <UI.BasicActivity navigation={navigation} route={route} applyPadding={false} screenName="Tabs Sample">
      <UI.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        sceneMap={renderScene}
      />
    </UI.BasicActivity>
  );
}

export default memo(SampleContainersScreen);