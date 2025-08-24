import HomeScreen from './HomeScreen';
import LayoutScreen from './LayoutScreen';
import MenuScreen from './MenuScreen';
import { Core } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
export const screenMap: Core.ScreenMap = {
  'home': HomeScreen,
  'layout': LayoutScreen,
  'menu': MenuScreen,
};