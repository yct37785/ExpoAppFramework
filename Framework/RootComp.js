// core
import React, { Node, useCallback, useMemo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme,
  Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// utils
import { getLocalUserData } from './Utilities/DataUtils';
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
// data
import { ThemePrefContext } from './Contexts/ThemePrefContext';
import { DataContext } from './Contexts/DataContext';

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
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [userData, setUserData] = useState(null);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  /**------------------------------------------------------------------------------------*
   * Context callbacks
   *------------------------------------------------------------------------------------*/
  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const setUserDataCallback = useCallback((newUserData) => {
    setUserData(newUserData);
  }, []);

  /**------------------------------------------------------------------------------------*
   * Context objects
   *------------------------------------------------------------------------------------*/
  const themePref = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const dataValues = useMemo(
    () => ({
      userData,
      setUserData: setUserDataCallback
    }),
    [userData]
  );
  
  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    const newUserData = await getLocalUserData(NEW_USER_DATA);
    setUserData(newUserData);
  }

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <ThemePrefContext.Provider value={themePref}>
      <DataContext.Provider value={dataValues}>
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
      </DataContext.Provider>
    </ThemePrefContext.Provider>
  );
};

export default RootComp;