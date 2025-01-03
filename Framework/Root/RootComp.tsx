// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// test
import TestRootComp from '../Testing/TestRootComp';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// hooks
import { useLocalDataContext, LocalDataProvider } from '../DataManagement/LocalDataManager';
import { FirestoreProvider } from '../DataManagement/FirestoreManager';
import { SystemSettingsProvider } from '../Hook/SystemSettingsHook';
// deps
import 'react-native-get-random-values';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// theme adaptation for navigation
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
  }
}
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
  }
}

const TEST_MODE = false;

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();

/**
 * A wrapper for screens to standardize their layout.
 * 
 * @param component - The screen component to render.
 * 
 * @returns The screen wrapped with a standardized layout.
 */
const ScreenWrapper: React.FC<{ component: React.ComponentType<any>; [key: string]: any }> = ({ component: Component, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <Component {...props} />
    </View>
  );
}

/**
 * root comp props
 * 
 * @param screenMap - User defined map of screens to key for @react-navigation identification.
 * @param DEFAULT_SCREEN - Default launching screen.
 */
export interface IRootCompProps {
  screenMap: Record<string, React.ComponentType<any>>;
  DEFAULT_SCREEN: string;
}

/**
 * The root component of the entire app. Handles initialization, context providers, and navigation.
 */
const RootComp: React.FC<IRootCompProps> = ({ screenMap, DEFAULT_SCREEN }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);
  const { isLocalDataReady, readLocalData, writeLocalData } = useLocalDataContext();

  /**
   * triggered on local data ready and update
   */
  useEffect(() => {
    // apply system settings
    if (isLocalDataReady) {
      setDarkMode(readLocalData("isDarkMode"));
    }
  }, [isLocalDataReady]);

  /**
   * toggle dark mode
   */
  function setDarkMode(isDarkMode: boolean) {
    if (isDarkMode !== (theme === CombinedDarkTheme)) {
      const newTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
      setTheme(newTheme);
    }
  }

  /**
   * system settings toggle
   */
  const toggleDarkMode = async (): Promise<void> => {
    await writeLocalData("isDarkMode", !readLocalData("isDarkMode"));
    setDarkMode(readLocalData("isDarkMode"));
  }

  const navContainerTheme = theme === CombinedDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;
  return (
    <FirestoreProvider>
      <SystemSettingsProvider toggleDarkMode={toggleDarkMode}>
        <PaperProvider theme={theme}>
          <MenuProvider>
            {/* <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0 }}> */}
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
              {isLocalDataReady ? <NavigationContainer theme={navContainerTheme}>
                <Stack.Navigator
                  initialRouteName={DEFAULT_SCREEN}
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  {Object.keys(screenMap).map((key) => (
                    <Stack.Screen name={key} key={key}>
                      {(props) => (
                        <ScreenWrapper {...props} component={screenMap[key]} extraData={{}} />
                      )}
                    </Stack.Screen>
                  ))}
                </Stack.Navigator>
              </NavigationContainer> : null}
            </View>
          </MenuProvider>
        </PaperProvider>
      </SystemSettingsProvider>
    </FirestoreProvider>
  );
}

/**
 * LocalDataProvider wrapper props
 * 
 * @param LOCAL_DATA_VALUES - Default local data values schema.
 */
interface ILocalDataProviderWrapperProps extends IRootCompProps {
  LOCAL_DATA_VALUES: Record<string, any>;
}

/**
 * Wrapper for LocalDataProvider to ensure it renders before RootComp.
 */
const LocalDataProviderWrapper: React.FC<ILocalDataProviderWrapperProps> = ({ screenMap, DEFAULT_SCREEN, LOCAL_DATA_VALUES }) => {
  return (
    <LocalDataProvider schema={LOCAL_DATA_VALUES}>
      <RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} />
    </LocalDataProvider>
  );
}

/**
 * Wrapper for TestRootComp so that it uses IRootCompProps.
 */
const TestRootCompWrapper: React.FC<ILocalDataProviderWrapperProps> = ({ screenMap, DEFAULT_SCREEN, LOCAL_DATA_VALUES }) => {
  return (
    <TestRootComp />
  );
}

const Component: React.FC<ILocalDataProviderWrapperProps> = TEST_MODE ? memo(TestRootCompWrapper) : memo(LocalDataProviderWrapper);
export default Component;