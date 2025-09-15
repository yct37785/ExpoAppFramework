import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

/******************************************************************************************************************
 * Props for individual screen routes:
 * - Each screen in the stack can define its own expected params.
 * - By default, this example includes a single string parameter.
 * 
 * @property paramText - sample text data parameter passed via navigation
 ******************************************************************************************************************/
type ScreenRouteProps = {
  paramText: string;
};

/******************************************************************************************************************
 * Map route names to their expected parameter definitions for the stack.
 *
 * @property [key] - a screen route name mapped to its ScreenRouteProps contract
 ******************************************************************************************************************/
export type RootStackPropsList = {
  [key: string]: ScreenRouteProps;
};

/******************************************************************************************************************
 * Base props provided to all screens:
 * - Each screen receives a navigation prop (for controlling navigation) 
 *   and a route prop (containing params and metadata).
 *
 * @template T - specific screen name from RootStackPropsList (defaults to any key)
 *
 * @property navigation - navigation controller for stack operations
 * @property route - current route object for the screen:
 *   - name: string - active route name
 *   - params: RootStackPropsList[T] - typed route parameters for the active screen
 ******************************************************************************************************************/
export type ScreenProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  route: RouteProp<RootStackPropsList, T>;
};

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
