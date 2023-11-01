// core
import React, { Node, useCallback, useMemo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme,
  Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// data
import { LocalDataContext } from './Contexts/LocalDataContext';
import useLocalDataManager from './Managers/LocalDataManager';
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
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

// temp warning disabling
LogBox.ignoreLogs(['new NativeEventEmitter']);

// nav
const Stack = createNativeStackNavigator();

// screens
function ScreenWrapper({ component: Component, ...props }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Component {...props} />
    </View>
  );
}

// main
const RootComp = ({ screenMaps, DEFAULT_SCREEN, NEW_USER_DATA, APP_NAME }) => {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const localDataManager = useLocalDataManager({ NEW_USER_DATA });
  const [theme, setTheme] = useState(CombinedDarkTheme);

  /**------------------------------------------------------------------------------------*
   * Theme
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    const newTheme = localDataManager.getLocalDataValue("settings_sample.isDarkMode") ? CombinedDarkTheme : CombinedDefaultTheme;
    console.log("RootComp: toggle dark mode: " + localDataManager.getLocalDataValue("settings_sample.isDarkMode"));
    setTheme(newTheme);
  }, [localDataManager.updateCount]);
  
  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <LocalDataContext.Provider value={localDataManager}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          {/* <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0 }}> */}
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer theme={theme}>
              <Stack.Navigator
                initialRouteName={DEFAULT_SCREEN}
                screenOptions={{
                  headerShown: false
                }}
              >
                {Object.keys(screenMaps).map((key) => (
                  <Stack.Screen name={key} key={key}>
                    {(props) => (
                      <ScreenWrapper {...props} component={screenMaps[key]} extraData={{}} />
                    )}
                  </Stack.Screen>
                ))}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </MenuProvider>
      </PaperProvider>
    </LocalDataContext.Provider>
  );
};

export default RootComp;