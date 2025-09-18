// deps
import 'react-native-get-random-values';
// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text, Button } from 'react-native-paper';
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

// config
LogBox.ignoreLogs(['new NativeEventEmitter']);

// create stack
const Stack = createNativeStackNavigator<RootStackPropsList>();

/******************************************************************************************************************
 * Wrap a screen component so it receives typed { navigation, route } props from the stack render callback.
 *
 * @param props - wrapper props:
 *   - Component: fn - screen component to render (receives { navigation, route })
 *   - navigation: obj - navigation controller for stack operations
 *   - route: obj - current route info:
 *     + name: string - route name
 *     + params?: obj - route parameters (shape depends on the screen)
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

type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/******************************************************************************************************************
 * Compose global providers (paper, popup menu, localdata, auth) and configure the navigation container + stack
 * using a provided screen map, synchronizing theme with stored user preference.
 *
 * @param props - root props:
 *   - DEFAULT_SCREEN: string - initial route name for the stack navigator
 *   - screenMap: ScreenMap - mapping of route names to screen components
 ******************************************************************************************************************/
const Root: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const { getItem, isLoaded } = useLocalData();
  const [theme, setTheme] = useState(CombinedDarkTheme);

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
    setTheme(darkMode ? CombinedDarkTheme : CombinedDefaultTheme);
  }, [isLoaded, getItem('isDarkMode')]);

  const navContainerTheme = theme === CombinedDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
    </View>
  );
}

/******************************************************************************************************************
 * Provide localdata and auth contexts around the root component and export the wrapped app entry.
 *
 * @param props - same as root:
 *   - DEFAULT_SCREEN: string - initial route name
 *   - screenMap: ScreenMap - mapping of route names to screen components
 ******************************************************************************************************************/
const LocalDataProviderWrapper: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  return (
    <LocalDataProvider>
      <AuthProvider>
        <Root screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} />
      </AuthProvider>
    </LocalDataProvider>
  );
}

export default memo(LocalDataProviderWrapper);