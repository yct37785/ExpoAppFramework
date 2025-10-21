import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Screen, Const, UI_Core } from 'framework';
const _ = require('lodash');

/******************************************************************************************************************
 * Const defines
 ******************************************************************************************************************/
export const TAB_ROUTES: UI_Core.TabRouteProps[] = [
  { title: 'Collapsible', key: 'collapsible', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

export const ACCORDION_SECTION_TITLES: string[] = ['First', 'Second', 'Third'];

/******************************************************************************************************************
 * Collapsible and accordion demo
 ******************************************************************************************************************/
const CollapsiblePage = memo(() => {
  return <UI_Core.VerticalLayout>
    {/* CollapsibleContainer */}
    <UI_Core.Text variant='titleMedium' style={{ marginTop: Const.padSize }}>CollapsibleContainer</UI_Core.Text>
    <UI_Core.CollapsibleContainer toggleHeaderText='collapsible'>
      <View style={{ flex: 1, padding: Const.padSize }}>
        <UI_Core.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI_Core.Text>
      </View>
    </UI_Core.CollapsibleContainer>

    <UI_Core.Divider />

    {/* AccordionContainer */}
    <UI_Core.Text variant='titleMedium'>AccordionContainer</UI_Core.Text>
    <UI_Core.AccordionContainer sectionTitles={ACCORDION_SECTION_TITLES}>
      <View style={{ flex: 1, padding: Const.padSize }}>
        <UI_Core.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI_Core.Text>
      </View>
      <View style={{ flex: 1, padding: Const.padSize }}>
        <UI_Core.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI_Core.Text>
      </View>
      <View style={{ flex: 1, padding: Const.padSize }}>
        <UI_Core.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI_Core.Text>
      </View>
    </UI_Core.AccordionContainer>
  </UI_Core.VerticalLayout>;
});

/** component for page 2 */
const Tab2Page = memo(() => <View style={{ flex: 1 }}><UI_Core.Text>P2</UI_Core.Text></View>);

/** component for page 3 */
const Tab3Page = memo(() => <View style={{ flex: 1 }}><UI_Core.Text>P3</UI_Core.Text></View>);

/******************************************************************************************************************
 * Containers demo
 ******************************************************************************************************************/
const ContainersScreen: Screen.ScreenType = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * renders the scene for each tab
   */
  const scenes: UI_Core.TabsSceneMap = {
    collapsible: CollapsiblePage,
    p2: Tab2Page,
    p3: Tab3Page,
  };

  return (
    <Screen.ScreenWrapper>
      <UI_Core.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        position='top'
        sceneMap={scenes}
      />
    </Screen.ScreenWrapper>
  );
};

export default memo(ContainersScreen);
