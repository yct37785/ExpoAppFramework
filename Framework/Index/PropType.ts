import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleProp, ViewStyle } from 'react-native';
import { RouteProp } from '@react-navigation/native';

/**
 * screen route props
 * 
 * @prop paramText - React Navigation route params testing.
 */
export interface IScreenRouteProps {
  paramText?: string;
};

/**
 * props for each screen
 * - Each screen receives the same props.
 * 
 * @param key - Identifies the screen for navigation stack navigate() usage.
 */
type RootStackPropsList = {
  [key: string]: IScreenRouteProps;
};

/**
 * screen props
 * 
 * @prop navigation - @react-navigation
 * @prop route - @react-navigation
 */
export interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackPropsList>,
  route: RouteProp<RootStackPropsList>
};

/**
 * BasicActivity props
 * 
 * @prop navigation - React Navigation provided object for navigating between screens.
 * @prop title - Title of the screen to be displayed on app header.
 * @prop customHeaderContent - Custom content to display in the header.
 * @prop style - Additional style on base container.
 * @prop children - The body content of the screen.
 */
export interface IBasicActivityProps {
  navigation: NativeStackNavigationProp<RootStackPropsList>;
  title?: string;
  CustomHeaderComp?: React.FC<{}>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * system settings props
 * 
 * @prop toggleDarkMode - Defined function to toggle dark mode.
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
export type OnTestEndParams = { test: string; status: boolean }[];

export interface ITestRunnerProps {
  onTestEnd: (className: string, results: OnTestEndParams) => void;
};