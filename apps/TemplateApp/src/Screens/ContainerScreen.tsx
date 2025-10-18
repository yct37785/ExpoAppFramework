import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Core, Const, UI } from 'framework';
const _ = require('lodash');

/**
 * Const defines.
 */
export const TAB_ROUTES: UI.TabRouteProps[] = [
  { title: 'Collapsible', key: 'collapsible', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

export const ACCORDION_SECTION_TITLES: string[] = ['First', 'Second', 'Third'];

/******************************************************************************************************************
 * Collapsible and accordion demo
 ******************************************************************************************************************/
const CollapsiblePage = memo(() => {
  return <UI.VerticalLayout>
    {/* CollapsibleContainer */}
    <UI.Text variant='titleMedium' style={{ marginTop: Const.padSize }}>CollapsibleContainer</UI.Text>
    <UI.CollapsibleContainer toggleHeaderText='collapsible'>
      <View style={{ flex: 1, padding: Const.padSize }}>
        <UI.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
      </View>
    </UI.CollapsibleContainer>

    <UI.Divider />

    {/* AccordionContainer */}
    <UI.Text variant='titleMedium'>AccordionContainer</UI.Text>
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

/** component for page 2 */
const Tab2Page = memo(() => <View style={{ flex: 1 }}><UI.Text>P2</UI.Text></View>);

/** component for page 3 */
const Tab3Page = memo(() => <View style={{ flex: 1 }}><UI.Text>P3</UI.Text></View>);

/******************************************************************************************************************
 * Containers demo
 ******************************************************************************************************************/
const ContainersScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * renders the scene for each tab
   */
  const scenes: UI.TabsSceneMap = {
    collapsible: CollapsiblePage,
    p2: Tab2Page,
    p3: Tab3Page,
  };

  return (
    <Core.Activity navigation={navigation} title='Container Sample'>
      {/* tabs container */}
      <UI.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        position='top'
        sceneMap={scenes}
      />
    </Core.Activity>
  );
};

export default memo(ContainersScreen);