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

/******************************************************************************************************************
 * Wraps a screen component with navigation and route props.
 *
 * This is used inside the <Stack.Screen> render callback to inject the correct
 * navigation and route props into client-defined screens, ensuring type-safety.
 *
 * @param Component - The screen React component to render
 * @param navigation - The navigation object for controlling stack navigation
 * @param route - The route object containing params and route metadata
 *
 * @returns JSX.Element - The rendered screen wrapped in a <View>
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
 * Root component props
 *
 * @property DEFAULT_SCREEN - The name of the initial screen shown on app launch
 * @property screenMap - A mapping of screen names to their respective React components
 ******************************************************************************************************************/
type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/******************************************************************************************************************
 * Root component of the framework
 *
 * Provides global context providers and configures the navigation stack using the given screen map.
 *
 * @returns JSX.Element - The entire app root containing providers and navigation stack
 ******************************************************************************************************************/
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