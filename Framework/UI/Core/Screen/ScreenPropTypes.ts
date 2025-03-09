import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

/**
 * screen route props
 * 
 * @param paramText - React Navigation route params testing.
 */
export interface IScreenRouteProps {
  paramText?: string;
}

/**
 * props for each screen
 * - Each screen receives the same props.
 * 
 * @param key - Identifies the screen for navigation stack navigate() usage.
 */
export type RootStackPropsList = {
  [key: string]: IScreenRouteProps;
}

/**
 * screen props
 * 
 * @param navigation - @react-navigation
 * @param route - @react-navigation
 */
export interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackPropsList>,
  route: RouteProp<RootStackPropsList>
}