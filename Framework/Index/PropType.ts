import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleProp, ViewStyle } from 'react-native';
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
 * BasicActivity props
 * 
 * @param navigation - React Navigation provided object for navigating between screens.
 * @param title - Title of the screen to be displayed on app header.
 * @param customHeaderContent - Custom content to display in the header.
 * @param style - Additional style on base container.
 * @param children - The body content of the screen.
 */
export interface IBasicActivityProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  title?: string;
  CustomHeaderComp?: React.FC<{}>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * system settings props
 */
export interface ISystemSettingsContextProps {
  toggleDarkMode: () => Promise<void>;
}

/**
 * local data manager props
 */
export interface ILocalDataManagerProps {
  isLocalDataReady: boolean;
  updateFlag: number;
  writeLocalData: (key: string, value: any, bypassSchema?: boolean) => Promise<void>;
  readLocalData: (key: string) => any;
  readDanglingKeys: () => Promise<Record<string, any>>;
  clearDanglingKeys: () => Promise<void>;
  clearLocalData: () => Promise<void>;
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

/**
 * on layout change hook props
 */
export interface ILayoutSizeProps {
  width: number;
  height: number;
};

/**
 * root comp props
 */
export interface IRootCompProps {
  screenMap: Record<string, React.ComponentType<any>>;
  DEFAULT_SCREEN: string;
};

export interface ILocalDataProviderWrapperProps {
  screenMap: Record<string, React.ComponentType<any>>;
  DEFAULT_SCREEN: string;
  LOCAL_DATA_VALUES: Record<string, any>;
};

/**
 * test runner props
 */
export type IOnTestEndProps = { test: string; status: boolean }[];

export interface ITestRunnerProps {
  onTestEnd: (className: string, results: IOnTestEndProps) => void;
}