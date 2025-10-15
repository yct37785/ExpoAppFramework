// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// core
import React, { memo, useEffect } from 'react';
import { View, StatusBar, Platform, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// UI
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen typing
import { RootStackPropsList, ScreenProps, ScreenMap } from './Core/Screen';
// data
import { useLocalData, LocalDataProvider } from './Managers/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
// auth
import { AuthProvider } from './Managers/Firebase/FirebaseAuthManager';
// utils
import { doLog } from './Utils/General';
import { logColors } from './Const';

LogBox.ignoreLogs(['new NativeEventEmitter']);

/******************************************************************************************************************
 * Navigation theme adaptation (Paper ↔ React Navigation).
 * Keep these at module scope so they’re stable across renders.
 ******************************************************************************************************************/
const { LightTheme: NavLight, DarkTheme: NavDark } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

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
const Stack = createNativeStackNavigator<RootStackPropsList>();
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
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const RootApp: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const { isLoaded, getItem } = useLocalData();
  if (!isLoaded) return <View style={{ flex: 1 }} />;

  const isDarkMode = !!getItem<boolean>('isDarkMode');

  // pick theme
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDarkMode ? NavDark : NavLight;

  // Firebase pulse check (once)
  useEffect(() => {
    try {
      const firebaseApp = getApp(); // default app from native config
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${String(err)}`);
    }
  }, []);

  // status bar icons based on theme (NavContainer handles bar colors)
  useEffect(() => {
    const bar = isDarkMode ? 'light-content' : 'dark-content';
    StatusBar.setBarStyle(bar, true);
    if (Platform.OS === 'android') {
      // optionally: StatusBar.setBackgroundColor could be set to navTheme.colors.background
      // if using custom fullscreen layout
    }
  }, [isDarkMode]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <AuthProvider>
          <MenuProvider>
            <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
              <NavigationContainer theme={navTheme}>
                <Stack.Navigator
                  initialRouteName={DEFAULT_SCREEN}
                  screenOptions={{ headerShown: false }}
                >
                  {Object.entries(screenMap).map(([name, Component]) => (
                    <Stack.Screen name={name} key={name}>
                      {props => (
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
            </View>
          </MenuProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide LocalData context around RootApp and export the wrapped app entry.
 *
 * @param props - Refer to RootProps
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <LocalDataProvider>
      <RootApp {...props} />
    </LocalDataProvider>
  );
};

export default memo(AppEntry);
