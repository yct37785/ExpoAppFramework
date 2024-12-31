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
 * 
 * - each screen takes in IScreenRouteProps via @react-navigation
 */
type RootStackParamList = {
  [key: string]: IScreenRouteProps;
};

export interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList>
};

/**
 * system settings props
 */
export interface ISystemSettingsContextProps {
  toggleDarkMode: () => Promise<void>;
}

/**
 * Firebase props
 */
export interface IFirestoreManagerProps {
  createCollection: (collectionName: string, initialData?: object[]) => Promise<boolean>;
  createDocument: (collectionName: string, docId: string, data: object) => Promise<boolean>;
  readDocument: (collectionName: string, docId: string) => Promise<object | null>;
  updateDocument: (collectionName: string, docId: string, data: object) => Promise<boolean>;
  deleteDocument: (collectionName: string, docId: string) => Promise<boolean>;
  readAllDocuments: (collectionName: string) => Promise<object[]>;
  listenToDocument: (collectionName: string, docId: string, onChange: (data: object) => void) => () => void;
  deleteCollection: (collectionName: string) => Promise<boolean>;
};