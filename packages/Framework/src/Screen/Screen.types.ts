import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type React from 'react';

/******************************************************************************************************************
 * Base props each screen receives.
 *
 * @template P - Param list (must extend ParamListBase)
 * @template N - Route name (key of P)
 ******************************************************************************************************************/
export type ScreenProps<
  P extends ParamListBase = ParamListBase,
  N extends keyof P & string = string
> = {
  navigation: NativeStackNavigationProp<P, N>;
  route: RouteProp<P, N>;
};

/******************************************************************************************************************
 * Type for each screen in consumer app.
 ******************************************************************************************************************/
export type ScreenType = React.FC<ScreenProps>;

/******************************************************************************************************************
 * Schema for the screen map:
 * - A dictionary mapping screen names to React functional components.
 * - This is passed into the Root component to register all screens.
 *
 * @property [screenName] - a route name mapped to a React.FC that consumes ScreenProps
 * 
 * @usage
 * ```tsx
 * const screenMap: ScreenMap = {
 *   Home: HomeScreen,
 *   Details: DetailsScreen
 * }
 * ```
 ******************************************************************************************************************/
export type ScreenMap = Record<string, React.FC<ScreenProps>>;
