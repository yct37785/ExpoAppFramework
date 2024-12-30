import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

/**
 * route props
 */
export interface IScreenRouteProps {
  paramText?: string;
};

/**
 * screen props
 */
type RootStackParamList = {
  [key: string]: IScreenRouteProps;
};

export interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList>
}