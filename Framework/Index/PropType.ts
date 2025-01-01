import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleProp, ViewStyle } from 'react-native';
import { RouteProp } from '@react-navigation/native';

/**
 * screen route props
 * 
 * @param paramText - React Navigation route params testing.
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
 * @param navigation - @react-navigation
 * @param route - @react-navigation
 */
export interface IScreenProps {
  navigation: NativeStackNavigationProp<RootStackPropsList>,
  route: RouteProp<RootStackPropsList>
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
  navigation: NativeStackNavigationProp<RootStackPropsList>;
  title?: string;
  CustomHeaderComp?: React.FC<{}>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * system settings props
 * 
 * @param toggleDarkMode - Defined function to toggle dark mode.
 */
export interface ISystemSettingsContextProps {
  toggleDarkMode: () => Promise<void>;
}

/**
 * local data manager props
 * 
 * @param isLocalDataReady - Flag updates to true when local data is loaded to memory.
 * @param updateFlag - Triggers re-render when local data is updated.
 * @param writeLocalData - Writes a key-value pair to storage if valid.
 * @param readLocalData - Reads a value by key from storage.
 * @param readDanglingKeys - Retrieves dangling keys not listed in the schema.
 * @param clearDanglingKeys - Clears all dangling keys from storage.
 * @param clearLocalData - Clear all key-value pairs. For testing usage.
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
 * 
 * @param createCollection - Creates a collection with optional initial data.
 * @param createDocument - Creates or overwrites a document.
 * @param readDocument - Reads a document by ID.
 * @param updateDocument - Updates fields in an existing document.
 * @param deleteDocument - Deletes a document by ID.
 * @param readAllDocuments - Reads all documents from a collection.
 * @param listenToDocument - Listens for changes on a specific document.
 * @param deleteCollection - Deletes an entire collection by deleting all its documents.
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
 * 
 * @param width - Receive width of React comp on layout change.
 * @param height - Receive height of React comp on layout change.
 */
export interface ILayoutSizeProps {
  width: number;
  height: number;
};

/**
 * root comp props
 * 
 * @param screenMap - User defined map of screens to key for @react-navigation identification.
 * @param DEFAULT_SCREEN - Default launching screen.
 */
export interface IRootCompProps {
  screenMap: Record<string, React.ComponentType<any>>;
  DEFAULT_SCREEN: string;
};

/**
 * root comp props
 * 
 * @param LOCAL_DATA_VALUES - Default local data values schema.
 */
export interface ILocalDataProviderWrapperProps extends IRootCompProps {
  LOCAL_DATA_VALUES: Record<string, any>;
};

/**
 * test runner OnTestEnd results list
 * 
 * @param test - Test ID.
 * @param status - Status of test.
 */
export type OnTestEndResultsList = { test: string; status: boolean }[];

/**
 * test runner props
 * 
 * @param onTestEnd - Function downstream test runners call to submit test results.
 * @param onTestEnd.className - Downstream test runner class name.
 * @param onTestEnd.results - Results list.
 */
export interface ITestRunnerProps {
  onTestEnd: (className: string, results: OnTestEndResultsList) => void;
};