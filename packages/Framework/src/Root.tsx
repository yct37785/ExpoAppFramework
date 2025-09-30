// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// theme
import { ThemeProvider, useTheme, useThemeMode } from './Theme/ThemeProvider';
import type { Theme } from './Theme/Theme';
// UI
import { Provider as PaperProvider, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text, Button } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// screen
import { RootStackPropsList, ScreenProps, ScreenMap } from './Core/Screen';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// data
import { useLocalData, LocalDataProvider } from './Managers/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
import { AuthProvider } from './Managers/Firebase/FirebaseAuthManager';
// const
import { logColors } from './Const';
// utils
import { doLog } from './Utils';

// legacy RN Paper -------------------------------------------------------------/
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
// legacy RN Paper -------------------------------------------------------------/

// config
LogBox.ignoreLogs(['new NativeEventEmitter']);

// create stack
const Stack = createNativeStackNavigator<RootStackPropsList>();

/******************************************************************************************************************
 * Local data sync helper.
 ******************************************************************************************************************/
const LocalDataSyncHelper: React.FC = () => {
  const { isLoaded, getItem } = useLocalData();
  const { setMode } = useThemeMode();

  // LocalData context re-renders when values change,
  // reading the key as a render-time value works as a dependency:
  const darkPref = isLoaded ? !!getItem<boolean>('isDarkMode') : false;

  React.useEffect(() => {
    if (!isLoaded) return;
    setMode(darkPref ? 'dark' : 'light');
  }, [isLoaded, darkPref, setMode]);

  return null;
};

/******************************************************************************************************************
 * Wrap a screen component so it receives typed { navigation, route } props from the stack render callback.
 *
 * @param props - Wrapper props:
 *   - Component  - Screen component to render (receives { navigation, route })
 *   - navigation - Navigation controller for stack operations
 *   - route: {}  - Current route info:
 *     + name: string   - Route name
 *     + params?: {}    - Route parameters (shape depends on the screen)
 ******************************************************************************************************************/
const ScreenWrapper = ({
  Component,
  navigation,
  route,
}: {
  Component: React.FC<ScreenProps>;
} & ScreenProps) => (
  <View style={{ flex: 1 }}>
    <Component navigation={navigation} route={route} />
  </View>
);

/******************************************************************************************************************
 * Root component props.
 *
 * @property DEFAULT_SCREEN - Initial route name for the stack navigator
 * @property screenMap      - Mapping of route names to screen components
 * @property lightTheme     - Fully-specified light Theme
 * @property darkTheme      - Fully-specified dark Theme
 ******************************************************************************************************************/
type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
  lightTheme: Theme;
  darkTheme: Theme;
};

/******************************************************************************************************************
 * Root: consume theme, derive Paper + Navigation themes from it (no local state/effects).
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const Root: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const t = useTheme();
  // legacy RN Paper -------------------------------------------------------------/
  const paperTheme = t.isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  // legacy RN Paper -------------------------------------------------------------/
  const navContainerTheme = t.isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  // Firebase pulse check
  useEffect(() => {
    try {
      // get the default app that RN Firebase auto-initialized from native files
      const firebaseApp = getApp();
      // log proof that native config was loaded from google-services.json
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${err}`);
    }
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <MenuProvider>
        <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
          <NavigationContainer theme={navContainerTheme}>
            <Stack.Navigator initialRouteName={DEFAULT_SCREEN} screenOptions={{ headerShown: false }}>
              {Object.entries(screenMap).map(([name, Component]) => (
                <Stack.Screen name={name} key={name}>
                  {(props) => (
                    <ScreenWrapper Component={Component} navigation={props.navigation} route={props.route} />
                  )}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </MenuProvider>
    </PaperProvider>
  );
}

/******************************************************************************************************************
 * Local data > pick initial theme mode > mount ThemeProvider > mount auth + Root.
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const ThemingGate: React.FC<Omit<RootProps, 'lightTheme' | 'darkTheme'> & {
  lightTheme: Theme; darkTheme: Theme;
}> = ({ lightTheme, darkTheme, ...rest }) => {
  const { isLoaded, getItem } = useLocalData();
  if (!isLoaded) return <View style={{ flex: 1 }} />;

  const initialMode: 'light' | 'dark' = getItem<boolean>('isDarkMode') ? 'dark' : 'light';

  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} initialMode={initialMode}>
      <LocalDataSyncHelper />
      <AuthProvider>
        <Root {...rest} lightTheme={lightTheme} darkTheme={darkTheme} />
      </AuthProvider>
    </ThemeProvider>
  );
};

/******************************************************************************************************************
 * Provide localdata and auth contexts around the root component and export the wrapped app entry.
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const LocalDataGate: React.FC<RootProps> = (props) => {
  return (
    <LocalDataProvider>
      <ThemingGate {...props} />
    </LocalDataProvider>
  );
}

export default memo(LocalDataGate);