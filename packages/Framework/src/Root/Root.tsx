// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// screen typing and layout
import { ScreenMap } from '../Screen/Screen';
import { ScreenLayoutProps } from '../Screen/ScreenLayout';
// core
import React, { memo, useEffect } from 'react';
import { View, StatusBar, Platform, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// UI
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ParamListBase
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen layout
import { ScreenLayoutContext } from '../Screen/ScreenLayout';
// Firebase
import { getApp } from '@react-native-firebase/app';
// utils
import { doLog } from '../Utils/General';
import { logColors } from '../Const';

LogBox.ignoreAllLogs();

// mode
console.log('DEV MODE:', __DEV__);

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
 * @property DEFAULT_SCREEN   - Initial route name for the stack navigator
 * @property screenMap        - Mapping of route names to screen components
 * @property defaultScreenLayoutProps   - app wide screen layout (AppBar left content etc)
 ******************************************************************************************************************/
export type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
  defaultScreenLayoutProps: ScreenLayoutProps;
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
const RootApp: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap, defaultScreenLayoutProps }) => {

  // pick theme
  const paperTheme = MD3LightTheme;
  const navTheme = NavLight;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <MenuProvider>
          <ScreenLayoutContext.Provider value={defaultScreenLayoutProps}>
            <NavigationContainer theme={navTheme}>
              <Stack.Navigator initialRouteName={DEFAULT_SCREEN} screenOptions={{ headerShown: false }}>
                {Object.entries(screenMap).map(([name, Component]) => (
                  <Stack.Screen name={name} key={name} component={Component as any} />
                ))}
              </Stack.Navigator>
            </NavigationContainer>
          </ScreenLayoutContext.Provider>
        </MenuProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide LocalData context around RootApp and export the wrapped app entry.
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <RootApp {...props} />
  );
};

export default memo(AppEntry);
