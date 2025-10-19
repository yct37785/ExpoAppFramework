// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// core
import React, { memo, useEffect } from 'react';
import { View, StatusBar, Platform, LogBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// UI
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ParamListBase
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen typing
import { ScreenMap } from '../Screen/Screen.types';
// data
import { useLocalData, LocalDataProvider } from '../Managers/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
// auth
import { AuthProvider, useAuth } from '../Managers/Firebase/FirebaseAuthManager';
// utils
import { doLog } from '../Utils/General';
import { logColors } from '../Const';

LogBox.ignoreLogs(['new NativeEventEmitter']);

/******************************************************************************************************************
 * Navigation theme adaptation (Paper ↔ React Navigation).
 * Keep these at module scope so they’re stable across renders.
 ******************************************************************************************************************/
const { LightTheme: NavLight, DarkTheme: NavDark } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const Stack = createNativeStackNavigator<ParamListBase>();

/******************************************************************************************************************
 * Root component props.
 *
 * @property DEFAULT_SCREEN - Initial route name for the stack navigator
 * @property screenMap      - Mapping of route names to screen components
 ******************************************************************************************************************/
type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/******************************************************************************************************************
 * RootApp
 *
 * Single gate that:
 *  1) Waits for LocalData to load and reads `isDarkMode`.
 *  2) Chooses Paper MD3 theme + adapted React Navigation theme (no custom theme).
 *  3) Mounts providers and NavigationContainer.
 *
 * NOTE:
 *  - Hooks are always called in the same order; we avoid early returns before hooks.
 *  - We gate effect work with `if (!isLoaded) return;` and gate UI via conditional JSX.
 ******************************************************************************************************************/
const RootApp: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const { isLoaded, getItem } = useLocalData();

  // derive a safe value even when not loaded yet (avoid conditional hooks)
  const isDarkMode = isLoaded ? !!getItem<boolean>('isDarkMode') : false;

  // pick theme
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDarkMode ? NavDark : NavLight;

  // Firebase pulse check (once we have LocalData)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const firebaseApp = getApp();
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${String(err)}`);
    }
  }, [isLoaded]);

  // status bar icons based on theme (NavContainer handles bar colors)
  useEffect(() => {
    const bar = isDarkMode ? 'light-content' : 'dark-content';
    StatusBar.setBarStyle(bar, true);
    if (Platform.OS === 'android') {
      // Optionally: StatusBar.setBackgroundColor could be set to navTheme.colors.background
      // if using custom fullscreen layout
    }
  }, [isDarkMode]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <AuthProvider>
          <MenuProvider>
            {/* gate the rendered tree, not the hooks */}
            {!isLoaded ? (
              <View style={{ flex: 1 }} />
            ) : (
              <NavigationContainer theme={navTheme}>
                <Stack.Navigator initialRouteName={DEFAULT_SCREEN} screenOptions={{ headerShown: false }}>
                  {Object.entries(screenMap).map(([name, Component]) => (
                    <Stack.Screen name={name} key={name} component={Component as any} />
                  ))}
                </Stack.Navigator>
              </NavigationContainer>
            )}
          </MenuProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide LocalData context around RootApp and export the wrapped app entry.
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <LocalDataProvider>
      <RootApp {...props} />
    </LocalDataProvider>
  );
};

export default memo(AppEntry);
