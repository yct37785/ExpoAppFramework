import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

/**
 * individual screen route prop
 * - each screen receives the same props
 */
type ScreenRouteProps = {
  paramText: string;
}

/**
 * screen stack to route map
 */
export type RootStackPropsList = {
  [key: string]: ScreenRouteProps;
}

/**
 * individual screen component props
 */
export type ScreenProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  route: RouteProp<RootStackPropsList, T>;
}

/**
 * screen map schema
 */
export type ScreenMap = {
  [screenName in keyof RootStackPropsList]: React.FC<ScreenProps>;
}