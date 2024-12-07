// core
import React, { Node, useCallback, memo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// test
import TestRootComp from '../Testing/TestRootComp';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// hooks
import { useLocalDataContext, LocalDataProvider } from '../Hook/LocalDataHook';
// deps
import 'react-native-get-random-values';
// nav
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
};
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
};

const TEST_MODE = true;

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();

/**
 * A wrapper for screens to standardize their layout.
 * 
 * @param {Object} props - The props passed to the screen.
 * @param {React.ComponentType} props.component - The screen component to render.
 * 
 * @returns {JSX.Element} The screen wrapped with a standardized layout.
 */
function ScreenWrapper({ component: Component, ...props }) {

  return (
    <View style={{ flex: 1 }}>
      <Component {...props} />
    </View>
  );
}

/**
 * The root component of the entire app. Handles initialization, context providers, and navigation.
 * 
 * @param {Object} props - The props passed to the root component.
 * @param {Object} props.screenMap - A mapping of screen names to their respective components, refer to TemplateApp > App.js.
 * @param {string} props.DEFAULT_SCREEN - The default screen to display on app launch, refer to TemplateApp > App.js.
 * @param {Object} props.LOCAL_DATA_SCHEMA - The schema for local storage data, refer to TemplateApp > App.js.
 */
const RootComp = ({ screenMap, DEFAULT_SCREEN }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);
  const { isLocalDataReady, readLocalData } = useLocalDataContext();

  /**
   * Triggered on local data ready and update
   */
  useEffect(() => {
    if (isLocalDataReady) {
      applySystemSettings();
    }
  }, [isLocalDataReady]);

  /**
   * Apply system settings
   */
  async function applySystemSettings() {
    const isDarkMode = await readLocalData("isDarkMode");
    if (isLocalDataReady && (isDarkMode !== (theme === CombinedDarkTheme))) {
      const newTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
      setTheme(newTheme);
    }
  }


  return (
    <PaperProvider theme={theme}>
      <MenuProvider>
        {/* <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0 }}> */}
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          {isLocalDataReady ? <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName={DEFAULT_SCREEN}
              screenOptions={{
                headerShown: false
              }}
            >
              {Object.keys(screenMap).map((key) => (
                <Stack.Screen name={key} key={key}>
                  {(props) => (
                    <ScreenWrapper {...props} component={screenMap[key]} extraData={{}} />
                  )}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
          </NavigationContainer> : null}
        </View>
      </MenuProvider>
    </PaperProvider>
  );
};

/**
 * Wrapper for LocalDataProvider to ensure it renders before RootComp
 * 
 * @param {Object} props - The props passed to the root component.
 * @param {Object} props.screenMap - A mapping of screen names to their respective components, refer to TemplateApp > App.js.
 * @param {string} props.DEFAULT_SCREEN - The default screen to display on app launch, refer to TemplateApp > App.js.
 * @param {Object} props.LOCAL_DATA_SCHEMA - The schema for local storage data, refer to TemplateApp > App.js.
 */
const LocalDataProviderWrapper = ({ screenMap, DEFAULT_SCREEN, LOCAL_DATA_SCHEMA }) => {
  return (
    <LocalDataProvider schema={LOCAL_DATA_SCHEMA}>
      <RootComp screenMap={screenMap} DEFAULT_SCREEN={DEFAULT_SCREEN} />
    </LocalDataProvider>
  );
}

export default TEST_MODE ? memo(TestRootComp) : memo(LocalDataProviderWrapper);