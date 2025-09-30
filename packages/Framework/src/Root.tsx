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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
 * Compose global providers (paper, popup menu, localdata, auth) and configure the navigation container + stack
 * using a provided screen map, synchronizing theme with stored user preference.
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const Root: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap, lightTheme, darkTheme }) => {
  const { getItem, isLoaded } = useLocalData();
  const { mode, setMode } = useThemeMode();
  // legacy RN Paper -------------------------------------------------------------/
  const [paperTheme, setPaperTheme] = useState(CombinedDarkTheme);
  // legacy RN Paper -------------------------------------------------------------/

  useEffect(() => {
    // Firebase pulse check
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

  useEffect(() => {
    if (!isLoaded) return;
    // sync theme with stored setting
    const darkMode = getItem('isDarkMode');
    setMode(darkMode ? 'dark' : 'light');
    // legacy RN Paper -------------------------------------------------------------/
    setPaperTheme(darkMode ? CombinedDarkTheme : CombinedDefaultTheme);
    // legacy RN Paper -------------------------------------------------------------/
  }, [isLoaded, getItem('isDarkMode')]);  // TODO: getItem('isDarkMode') should not be in hooks, should be a trigger

  const navContainerTheme = mode === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <MenuProvider>
        <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
          {isLoaded && (
            <NavigationContainer theme={navContainerTheme}>
              <Stack.Navigator
                initialRouteName={DEFAULT_SCREEN}
                screenOptions={{
                  headerShown: false
                }}
              >
                {Object.entries(screenMap).map(([name, Component]) => (
                  <Stack.Screen name={name} key={name}>
                    {(props) => (
                      <ScreenWrapper
                        Component={Component}
                        navigation={props.navigation}
                        route={props.route}
                      />
                    )}
                  </Stack.Screen>
                ))}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </View>
      </MenuProvider>
    </PaperProvider>
  );
}

/******************************************************************************************************************
 * Provide localdata and auth contexts around the root component and export the wrapped app entry.
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const LocalDataProviderWrapper: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap, lightTheme, darkTheme }) => {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <LocalDataProvider>
        <AuthProvider>
          <Root screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} lightTheme={lightTheme} darkTheme={darkTheme} />
        </AuthProvider>
      </LocalDataProvider>
    </ThemeProvider>
  );
}

export default memo(LocalDataProviderWrapper);