/**
 * include any screens here by importing and including in screenMaps (feel free to remove the sample screens)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 * 
 * as the name suggests, screenMap serve as a directory of all screens in your app, 
 * with DEFAULT_SCREEN as the root screen
 */
import { FC } from 'react';
import SampleHomeScreen from '../Screen/SampleHomeScreen';
import SampleTextInputBtnScreen from '../Screen/SampleTextInputBtnScreen';
import SampleLayoutsScreen from '../Screen/SampleLayoutsScreen';
import SampleContainersScreen from '../Screen/SampleContainersScreen';
import SampleMenusScreen from '../Screen/SampleMenusScreen';
import SampleEmptyScreen from '../Screen/SampleEmptyScreen';
import SampleDataDisplayScreen from '../Screen/SampleDataDisplayScreen';

export interface IScreenMap {
  [key: string]: FC;
}

export const screenMap: IScreenMap = {
  home: SampleHomeScreen,
  textInputBtn: SampleTextInputBtnScreen,
  layouts: SampleLayoutsScreen,
  containers: SampleContainersScreen,
  menus: SampleMenusScreen,
  empty: SampleEmptyScreen,
  dataDisplay: SampleDataDisplayScreen
};

export const DEFAULT_SCREEN: string = 'home';
