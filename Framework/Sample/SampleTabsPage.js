import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from '../UI/Dialog';
import Picker from '../UI/Picker';
import DropdownMenu from '../UI/DropdownMenu';
import DropdownCheckMenu from '../UI/DropdownCheckMenu';
import TabBar from '../UI/TabBar';
// data
import { DataContext } from '../Common/DataContext';
// const
export const TAB_ROUTES = [
  { title: 'Page 1', key: 'p1', icon: 'google-street-view' },
  { title: 'Page 2', key: 'p2', icon: 'camera' },
  { title: 'Page 3', key: 'p3', icon: 'palm-tree' },
];

/**
 * Display sample page
 */
export default function SampleTabsPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { userData, setUserData } = React.useContext(DataContext);
  const [tabIndex, setTabIndex] = useState(0);

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (userData) {
      console.log(JSON.stringify(userData));
    }
  }, [userData]);

  /**------------------------------------------------------------------------------------*
   * Tabbar
   *------------------------------------------------------------------------------------*/
  function renderIcon({ route, focused, color }) {
    return <Icon name={route.icon} size={15} color={theme.colors.text} />
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'p1':
        return <View style={{ flex: 1, backgroundColor: 'green' }}><Text>P1</Text></View>
      case 'p2':
        return <View style={{ flex: 1, backgroundColor: 'blue' }}><Text>P2</Text></View>
      case 'p3':
        return <View style={{ flex: 1, backgroundColor: 'yellow' }}><Text>P3</Text></View>
      default:
        return null;
    }
  };

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* main content here */}
      <View style={{ width: '100%', flex: 1, padding: padSize }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Tabs" >
          </Appbar.Content>
        </Appbar.Header>
        <TabBar
          routes={TAB_ROUTES}
          renderIcon={renderIcon}
          tabIndex={tabIndex}
          onTabIdxChange={setTabIndex}
          sceneMap={renderScene} />
      </View>
    </View>
  );
}