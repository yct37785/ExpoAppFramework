import HomeScreen from './HomeScreen';
import HelloScreen from './HelloScreen';
import { Core } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
export const screenMap: Core.ScreenMap = {
  'home': HomeScreen,
  'hello': HelloScreen,
};