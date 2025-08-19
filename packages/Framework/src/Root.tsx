// core
import React, { ReactNode, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text, Button } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// deps
import 'react-native-get-random-values';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

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
 * Screen 1
 */
const ScreenOne: React.FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant='bodyLarge'>Screen One</Text>
      <Button mode='contained' onPress={() => navigation.navigate('ScreenTwo')}>Go to Screen Two</Button>
    </View>
  );
};

/**
 * Screen 2
 */
const ScreenTwo: React.FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen Two</Text>
      <Button mode='contained' onPress={() => navigation.goBack()}>Go Back</Button>
    </View>
  );
};

/**
 * the root component of the entire app. Handles initialization, context providers, and navigation
 */
const Root: React.FC<{}> = ({ }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);

  const navContainerTheme = theme === CombinedDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <NavigationContainer theme={navContainerTheme}>
            <Stack.Navigator initialRouteName='ScreenOne' screenOptions={{ headerShown: false }}>
              <Stack.Screen name='ScreenOne' component={ScreenOne} />
              <Stack.Screen name='ScreenTwo' component={ScreenTwo} />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </PaperProvider>
    </View>
  );
}

export default memo(Root);