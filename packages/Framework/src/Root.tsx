// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text, Button } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// screen
import { RootStackPropsList, ScreenProps, ScreenMap } from './core/screen';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
// deps
import 'react-native-get-random-values';

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

/**
 * screen wrapper
 */
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

/**
 * root props
 */
type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/**
 * the root component of the entire app. Handles initialization, context providers, and navigation
 */
const Root: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);

  const navContainerTheme = theme === CombinedDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <PaperProvider theme={theme}>
        <MenuProvider>
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
        </MenuProvider>
      </PaperProvider>
    </View>
  );
}

export default memo(Root);