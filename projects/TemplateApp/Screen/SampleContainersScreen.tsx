import React, { useState, memo } from 'react';
import { View } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';
import * as PropTypes from '../../../Framework/Index/PropTypes';

/**
 * Const defines.
 */
export const TAB_ROUTES: UI.ITabRouteProps[] = [
  { title: 'Collapsible', key: 'collapsible', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

export const ACCORDION_SECTION_TITLES: string[] = ["First", "Second", "Third"];

/**
 * Sample containers screen, demo simple container UI.
 */
const SampleContainersScreen: React.FC<PropTypes.IScreenProps> = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * Renders the scene for each tab.
   */
  const renderScene: UI.TabsSceneMapFunc = ({ route, jumpTo }) => {
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
  }

  /**
   * Collapsible containers demo.
   * 
   * @returns {JSX.Element} Collapsible containers page.
   */
  const CollapsiblePage = memo(() => {
    return <UI.VerticalLayout padding={Const.padSize} childMargin={Const.padSize}>

      {/* CollapsibleContainer */}
      <UI.Text variant="titleMedium" style={{ marginTop: Const.padSize }}>CollapsibleContainer</UI.Text>
      <UI.CollapsibleContainer toggleHeaderText="collapsible">
        <View style={{ flex: 1, padding: Const.padSize }}>
          <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
        </View>
      </UI.CollapsibleContainer>

      <UI.DividerComp />

      {/* AccordionContainer */}
      <UI.Text variant="titleMedium">AccordionContainer</UI.Text>
      <UI.AccordionContainer sectionTitles={ACCORDION_SECTION_TITLES}>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
        </View>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
        </View>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
        </View>
      </UI.AccordionContainer>

    </UI.VerticalLayout>;
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
    <UI.BasicActivity navigation={navigation} title="Containers Sample">
      <UI.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        position='top'
        sceneMap={renderScene}
      />
    </UI.BasicActivity>
  );
}

export default memo(SampleContainersScreen);