/***************************************************************************************
 * include any screens here by importing and including in screenMaps (feel free to remove the sample screens)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 * 
 * as the name suggests, screenMaps serve as a directory of all screens in your app, 
 * with DEFAULT_SCREEN as the root screen
***************************************************************************************/
import SampleNewScreen from '../Screens/SampleNewScreen';
import SampleHomeScreen from '../Screens/SampleHomeScreen';
import SampleLayoutsScreen from '../Screens/SampleLayoutsScreen';
import SampleContainersScreen from '../Screens/SampleContainersScreen';
import SampleTabsScreen from '../Screens/SampleTabsScreen';
import SampleMenusScreen from '../Screens/SampleMenusScreen';
import SampleEmptyScreen from '../Screens/SampleEmptyScreen';
import SampleDataDisplayScreen from '../Screens/SampleDataDisplayScreen';
import SampleLocalDataScreen from '../Screens/SampleLocalDataScreen';

export const screenMaps = {
  home: SampleHomeScreen,
  new: SampleNewScreen,
  layouts: SampleLayoutsScreen,
  containers: SampleContainersScreen,
  tabs: SampleTabsScreen,
  menus: SampleMenusScreen,
  empty: SampleEmptyScreen,
  dataDisplay: SampleDataDisplayScreen,
  localData: SampleLocalDataScreen
};

export const DEFAULT_SCREEN = 'home';