import { Screen } from 'framework';
// test bed
import TestbedScreen from './TestbedScreen';
// container
import CollapsiblesScreen from './Container/CollapsiblesScreen';
import TabsScreen from './Container/TabsScreen';
// data
import ListScreen from './Data/ListScreen';
// input
import InputsScreen from './Input/InputsScreen';
// interactive
import InteractivesScreen from './Interactive/InteractivesScreen';
// layout
import LayoutsScreen from './Layout/LayoutsScreen';
// menu
import ClickMenusScreen from './Menu/ClickMenusScreen';
import OptionsMenusScreen from './Menu/OptionsMenusScreen';
import SelectionMenusScreen from './Menu/SelectionMenusScreen';
// misc
import MiscScreen from './Misc/MiscScreen';
// modal
import ModalsScreen from './Modal/ModalsScreen';
// text
import TextScreen from './Text/TextScreen';
// visuals
import VisualsScreen from './Visuals/VisualsScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const screenRoutes = {
  testbed: 'testbed',
  collapsibles: 'collapsibles',
  tabs: 'tabs',
  list: 'list',
  inputs: 'inputs',
  interactives: 'interactives',
  layouts: 'layouts',
  clickMenus: 'clickMenus',
  optionsMenus: 'optionsMenus',
  selectionMenus: 'selectionMenus',
  misc: 'misc',
  modals: 'modals',
  text: 'text',
  visuals: 'visuals',
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const screenRegistry: Screen.ScreenMap = {
  [screenRoutes.testbed]: TestbedScreen,
  [screenRoutes.collapsibles]: CollapsiblesScreen,
  [screenRoutes.tabs]: TabsScreen,
  [screenRoutes.list]: ListScreen,
  [screenRoutes.inputs]: InputsScreen,
  [screenRoutes.interactives]: InteractivesScreen,
  [screenRoutes.layouts]: LayoutsScreen,
  [screenRoutes.clickMenus]: ClickMenusScreen,
  [screenRoutes.optionsMenus]: OptionsMenusScreen,
  [screenRoutes.selectionMenus]: SelectionMenusScreen,
  [screenRoutes.misc]: MiscScreen,
  [screenRoutes.modals]: ModalsScreen,
  [screenRoutes.text]: TextScreen,
  [screenRoutes.visuals]: VisualsScreen,
};
