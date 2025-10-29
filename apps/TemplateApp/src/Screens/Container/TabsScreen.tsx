import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Screen, Const, UI } from 'framework';
const _ = require('lodash');

/******************************************************************************************************************
 * Const defines
 ******************************************************************************************************************/
export const TAB_ROUTES: UI.TabRouteProps[] = [
  { title: 'Scene 1', key: 's1', icon: 'google-street-view' },
  { title: 'Scene 2', key: 's2', icon: 'camera' },
  { title: 'Scene 3', key: 's3', icon: 'palm-tree' },
];

/******************************************************************************************************************
 * Collapsible and accordion demo
 ******************************************************************************************************************/
/** component for scene 1 */
const TabScene1 = memo(() => <View style={{ flex: 1 }}><UI.Text>Scene 1</UI.Text></View>);

/** component for scene 2 */
const TabScene2 = memo(() => <View style={{ flex: 1 }}><UI.Text>Scene 2</UI.Text></View>);

/** component for scene 3 */
const TabScene3 = memo(() => <View style={{ flex: 1 }}><UI.Text>Scene 3</UI.Text></View>);

/******************************************************************************************************************
 * Tabs demo
 ******************************************************************************************************************/
const TabsScreen: Screen.ScreenType = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * renders the scene for each tab
   */
  const scenes: UI.TabsSceneMap = {
    s1: TabScene1,
    s2: TabScene2,
    s3: TabScene3,
  };

  return (
    <Screen.ScreenLayout>
      <UI.TabsContainer
        routes={TAB_ROUTES}
        tabIndex={tabIndex}
        onTabIdxChange={setTabIndex}
        position='top'
        sceneMap={scenes}
      />
    </Screen.ScreenLayout>
  );
};

export default memo(TabsScreen);
