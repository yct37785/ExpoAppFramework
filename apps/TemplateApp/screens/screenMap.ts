import { ScreenMap } from 'framework/core/screen.ts';
import HomeScreen from './HomeScreen';
import HelloScreen from './HelloScreen';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
export const screenMap: ScreenMap = {
  'home': HomeScreen,
  'hello': HelloScreen,
};