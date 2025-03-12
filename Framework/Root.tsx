// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// deps
import 'react-native-get-random-values';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
// screen
import { RootStackPropsList, ScreenProps, ScreenMap } from './Screen';
// hooks
import { useSettings, SettingsProvider } from './Hook/SettingsHook';
import { FirestoreProvider } from './Firebase/FirestoreHook';
// test
import TestRunner from './Test';
const TEST_MODE = false;

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
const Stack = createNativeStackNavigator();

/**
 * screen wrapper
 */
const ScreenWrapper = <T extends keyof RootStackPropsList>({
  Component,
  navigation,
  route,
}: {
  Component: React.FC<ScreenProps<T>>;
} & ScreenProps<T>) => {
  return (
    <View style={{ flex: 1 }}>
      <Component navigation={navigation} route={route} />
    </View>
  );
};

/**
 * root comp props
 */
type RootCompProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/**
 * the root component of the entire app. Handles initialization, context providers, and navigation
 */
const RootComp: React.FC<RootCompProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);
  const { settings } = useSettings();

  /**
   * sync theme
   */
  useEffect(() => {
    setTheme(settings.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme);
  }, [settings.isDarkMode]);

  const navContainerTheme = theme === CombinedDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;
  
  return (
    <FirestoreProvider>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {TEST_MODE ? <TestRunner /> : null}
            <NavigationContainer theme={navContainerTheme}>
              <Stack.Navigator
                initialRouteName={DEFAULT_SCREEN}
                screenOptions={{
                  headerShown: false
                }}
              >
                {Object.keys(screenMap).map((key) => (
                  <Stack.Screen
                    name={key}
                    key={key}
                  >
                    {(props) => (
                      <ScreenWrapper
                        Component={screenMap[key]}
                        navigation={props.navigation}
                        route={props.route as RouteProp<RootStackPropsList, typeof key>}
                      />
                    )}
                  </Stack.Screen>
                ))}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </MenuProvider>
      </PaperProvider>
    </FirestoreProvider>
  );
}

/**
 * wrapper for SettingsProvider
 */
const SettingsProviderWrapper: React.FC<RootCompProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  return (
    <SettingsProvider>
      <RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} />
    </SettingsProvider>
  );
}

export default memo(SettingsProviderWrapper);