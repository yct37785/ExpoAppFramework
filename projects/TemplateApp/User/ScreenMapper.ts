/**
 * include any screens here by importing and including in screenMaps (feel free to remove the sample screens)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 * 
 * as the name suggests, screenMap serve as a directory of all screens in your app, 
 * with DEFAULT_SCREEN as the root screen
 */
import { FC } from 'react';
import SampleHomeScreen from '../Screen/SampleHomeScreen';
// import SampleTextInputBtnScreen from '../Screen/SampleTextInputBtnScreen';
// import SampleLayoutsScreen from '../Screen/SampleLayoutsScreen';
// import SampleContainersScreen from '../Screen/SampleContainersScreen';
// import SampleMenusScreen from '../Screen/SampleMenusScreen';
// import SampleEmptyScreen from '../Screen/SampleEmptyScreen';
// import SampleDataDisplayScreen from '../Screen/SampleDataDisplayScreen';
import * as PropTypes from '../../../Framework/Index/PropTypes';

/**
 * define screen
 */
export enum ScreenNames {
  Home = 'home',
  TextInputBtn = 'textInputBtn',
  Layouts = 'layouts',
  Containers = 'containers',
  Menus = 'menus',
  Empty = 'empty',
  DataDisplay = 'dataDisplay',
}

/**
 * screen map
 */
export const screenMap: Record<ScreenNames, FC<PropTypes.IScreenProps>> = {
  [ScreenNames.Home]: SampleHomeScreen,
  [ScreenNames.TextInputBtn]: SampleHomeScreen,
  [ScreenNames.Layouts]: SampleHomeScreen,
  [ScreenNames.Containers]: SampleHomeScreen,
  [ScreenNames.Menus]: SampleHomeScreen,
  [ScreenNames.Empty]: SampleHomeScreen,
  [ScreenNames.DataDisplay]: SampleHomeScreen,
}

export const DEFAULT_SCREEN: ScreenNames = ScreenNames.Home;