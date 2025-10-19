import HomeScreen from './HomeScreen';
import TestbedScreen from './TestbedScreen';
import TypographyScreen from './TypographyScreen';
import LayoutScreen from './LayoutScreen';
import MenuScreen from './MenuScreen';
import ListScreen from './ListScreen';
import ContainerScreen from './ContainerScreen';
import { Screen } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
export const screenMap: Screen.ScreenMap = {
  'home': HomeScreen,
  'testbed': TestbedScreen,
  'typography': TypographyScreen,
  'layout': LayoutScreen,
  'menu': MenuScreen,
  'list': ListScreen,
  'container': ContainerScreen,
};