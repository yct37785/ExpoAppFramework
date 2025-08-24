import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

/******************************************************************************************************************
 * Props for individual screen routes
 *
 * Each screen in the stack can define its own expected params.
 * By default, this example includes a single string parameter.
 *
 * @property paramText - Sample text data parameter passed via navigation
 ******************************************************************************************************************/
type ScreenRouteProps = {
  paramText: string;
};

/******************************************************************************************************************
 * Stack route mapping
 *
 * Maps route names (keys) to their expected parameter definitions.
 * Allows TypeScript to infer the correct params for each screen.
 ******************************************************************************************************************/
export type RootStackPropsList = {
  [key: string]: ScreenRouteProps;
};

/******************************************************************************************************************
 * Base props provided to all screens
 *
 * Each screen receives a navigation prop (for controlling navigation)
 * and a route prop (containing params and metadata).
 *
 * @template T - The specific screen name from RootStackPropsList
 *
 * @property navigation - Navigation controller for stack operations
 * @property route - Current route object including name and params
 ******************************************************************************************************************/
export type ScreenProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  route: RouteProp<RootStackPropsList, T>;
};

/******************************************************************************************************************
 * Schema for the screen map
 *
 * A dictionary mapping screen names to React functional components.
 * This is passed into the Root component to register all screens.
 *
 * @example
 * const screenMap: ScreenMap = {
 *   Home: HomeScreen,
 *   Details: DetailsScreen
 * }
 ******************************************************************************************************************/
export type ScreenMap = Record<string, React.FC<ScreenProps>>;
