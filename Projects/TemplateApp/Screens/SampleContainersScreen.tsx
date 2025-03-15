import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { ScreenProps } from '@screen';
import * as UI from '@ui';
import Const from '@const';
const _ = require('lodash');

/**
 * Const defines.
 */
export const TAB_ROUTES: UI.TabRouteProps[] = [
  { title: 'Collapsible', key: 'collapsible', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

export const ACCORDION_SECTION_TITLES: string[] = ["First", "Second", "Third"];

/**
 * sample containers screen
 */
const SampleContainersScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * renders the scene for each tab
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
   * collapsible containers demo
   */
  const CollapsiblePage = memo(() => {
    return <UI.VerticalLayout padding={Const.padSize} gap={Const.padSize}>

      {/* CollapsibleContainer */}
      <Text variant="titleMedium" style={{ marginTop: Const.padSize }}>CollapsibleContainer</Text>
      <UI.CollapsibleContainer toggleHeaderText="collapsible">
        <View style={{ flex: 1, padding: Const.padSize }}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </UI.CollapsibleContainer>

      <Divider />

      {/* AccordionContainer */}
      <Text variant="titleMedium">AccordionContainer</Text>
      <UI.AccordionContainer sectionTitles={ACCORDION_SECTION_TITLES}>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
        <View style={{ flex: 1, padding: Const.padSize }}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </UI.AccordionContainer>

    </UI.VerticalLayout>;
  });

  /**
   * component for page 2
   */
  const Tab2Page = memo(() => {
    return <View style={{ flex: 1 }}><Text>P2</Text></View>;
  });

  /**
   * component for page 3
   */
  const Tab3Page = memo(() => {
    return <View style={{ flex: 1 }}><Text>P3</Text></View>;
  });

  return (
    <UI.Activity navigation={navigation} title="Container Sample">
      {/* tabs container */}
      <UI.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        position='top'
        sceneMap={renderScene}
      />
    </UI.Activity>
  );
};

export default memo(SampleContainersScreen);