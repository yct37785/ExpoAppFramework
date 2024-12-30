/**
 * include any screens here by importing and including in screenMaps (feel free to remove the sample screens)
 * define default page under DEFAULT_SCREEN, value must match respective key in screenMaps
 * 
 * as the name suggests, screenMap serve as a directory of all screens in your app, 
 * with DEFAULT_SCREEN as the root screen
 */
import { FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import SampleHomeScreen from '../Screen/SampleHomeScreen';
import SampleTextInputBtnScreen from '../Screen/SampleTextInputBtnScreen';
import SampleLayoutsScreen from '../Screen/SampleLayoutsScreen';
import SampleContainersScreen from '../Screen/SampleContainersScreen';
import SampleMenusScreen from '../Screen/SampleMenusScreen';
import SampleEmptyScreen from '../Screen/SampleEmptyScreen';
import SampleDataDisplayScreen from '../Screen/SampleDataDisplayScreen';
import * as PropType from '../../../Framework/Index/PropType';

/**
 * add your screen here
 */
const ScreenConfig = {
  home: SampleHomeScreen,
  textInputBtn: SampleTextInputBtnScreen,
  layouts: SampleLayoutsScreen,
  containers: SampleContainersScreen,
  menus: SampleMenusScreen,
  empty: SampleEmptyScreen,
  dataDisplay: SampleDataDisplayScreen
} as const;

/**
 * screen route params
 */
type ScreenNames = keyof typeof ScreenConfig;

type RootStackParamList = {
  [K in ScreenNames]: PropType.IScreenRouteProps;
};

interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList>
}

/**
 * screen map
 */
export const screenMap: { [key in ScreenNames]: FC<IScreenProps> } = ScreenConfig;

export const DEFAULT_SCREEN: string = 'home';
