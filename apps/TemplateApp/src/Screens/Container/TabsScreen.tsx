import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Tab route definitions
 ******************************************************************************************************************/
export const TAB_ROUTES_WITH_ICONS: UI.TabRouteProps[] = [
  { title: 'Scene 1', key: 's1', icon: 'google-street-view' },
  { title: 'Scene 2', key: 's2', icon: 'camera' },
  { title: 'Scene 3', key: 's3', icon: 'palm-tree' },
];

export const TAB_ROUTES_TEXT_ONLY: UI.TabRouteProps[] = [
  { title: 'Overview', key: 't1' },
  { title: 'Details', key: 't2' },
  { title: 'Activity', key: 't3' },
];

/******************************************************************************************************************
 * Tab scenes with colored backgrounds to make sections visually clear
 ******************************************************************************************************************/
const TabScene1 = memo(() => (
  <UI.Box flex={1} bgColor='#e3f2fd' p={2}>
    <UI.Text variant='titleMedium'>Scene 1</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      This scene is shown when the first tab is active.
    </UI.Text>
  </UI.Box>
));

const TabScene2 = memo(() => (
  <UI.Box flex={1} bgColor='#fff3e0' p={2}>
    <UI.Text variant='titleMedium'>Scene 2</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      Use this area for secondary content, lists, etc.
    </UI.Text>
  </UI.Box>
));

const TabScene3 = memo(() => (
  <UI.Box flex={1} bgColor='#e8f5e9' p={2}>
    <UI.Text variant='titleMedium'>Scene 3</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      A third scene for additional information.
    </UI.Text>
  </UI.Box>
));

const TopTabsOverviewScene = memo(() => (
  <UI.Box flex={1} bgColor='#e1f5fe' p={2}>
    <UI.Text variant='titleMedium'>Overview</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      Basic overview content.
    </UI.Text>
  </UI.Box>
));

const TopTabsDetailsScene = memo(() => (
  <UI.Box flex={1} bgColor='#fce4ec' p={2}>
    <UI.Text variant='titleMedium'>Details</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      Put detailed content here.
    </UI.Text>
  </UI.Box>
));

const TopTabsActivityScene = memo(() => (
  <UI.Box flex={1} bgColor='#f3e5f5' p={2}>
    <UI.Text variant='titleMedium'>Activity</UI.Text>
    <UI.Text variant='bodySmall' color='label'>
      Timeline, logs, or recent actions can go here.
    </UI.Text>
  </UI.Box>
));

/******************************************************************************************************************
 * Tabs demo screen
 ******************************************************************************************************************/
const TabsScreen: Screen.ScreenType = () => {
  const [topTabIndex, setTopTabIndex] = useState(0);
  const [bottomTabIndex, setBottomTabIndex] = useState(0);

  const iconSceneMap: UI.TabsSceneMap = {
    s1: TabScene1,
    s2: TabScene2,
    s3: TabScene3,
  };

  const textSceneMap: UI.TabsSceneMap = {
    t1: TopTabsOverviewScene,
    t2: TopTabsDetailsScene,
    t3: TopTabsActivityScene,
  };

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>
        {/* Header / introduction */}
        <UI.Text variant='titleLarge'>Tabs</UI.Text>
        <UI.Text variant='bodySmall'>
          Tabs let you switch between multiple scenes inside a single container.
          You can tap on a tab, or swipe horizontally to move between scenes.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* Example 1: Top tabs */}
        <UI.Text variant='titleMedium'>1. Top tabs</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Tabs positioned at the top, each with a title and optional icon.
        </UI.Text>

        <UI.Box mt={1} mb={2} style={{ height: 220 }}>
          <UI.TabsContainer
            routes={TAB_ROUTES_WITH_ICONS}
            tabIndex={topTabIndex}
            onTabIdxChange={setTopTabIndex}
            position='top'
            sceneMap={iconSceneMap}
          />
        </UI.Box>

        <UI.Divider spacing={2} />

        {/* Example 2: Bottom tabs */}
        <UI.Text variant='titleMedium'>2. Bottom tabs</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Tabs positioned at the bottom with text labels only.
        </UI.Text>

        <UI.Box mt={1} mb={2} style={{ height: 220 }}>
          <UI.TabsContainer
            routes={TAB_ROUTES_TEXT_ONLY}
            tabIndex={bottomTabIndex}
            onTabIdxChange={setBottomTabIndex}
            position='bottom'
            sceneMap={textSceneMap}
          />
        </UI.Box>

        {/* Usage notes */}
        <UI.Divider spacing={0} />
        <UI.Text variant='titleMedium'>Usage notes</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Each route must have a unique{' '}
          <UI.Text variant='bodySmall' color='label'>
            key
          </UI.Text>
          .
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • The{' '}
          <UI.Text variant='bodySmall' color='label' bold>
            sceneMap
          </UI.Text>{' '}
          should map each route key to a component.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Control the active tab index via{' '}
          <UI.Text variant='bodySmall' color='label' bold>
            tabIndex
          </UI.Text>{' '}
          and{' '}
          <UI.Text variant='bodySmall' color='label' bold>
            onTabIdxChange
          </UI.Text>{' '}
          for predictable navigation.
        </UI.Text>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TabsScreen);
