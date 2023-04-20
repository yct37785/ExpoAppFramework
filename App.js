// core
import React, { Node, useCallback, useMemo, useEffect, useState } from 'react';
import { View, LogBox, NativeModules } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme,
  Text } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// utils
import { getLocalUserData } from './Framework/Utilities/DataUtils';
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
// TAKENOTE: import your pages here
import SamplePage from './Framework/Sample/SamplePage';
// data
import { ThemePrefContext } from './Framework/Common/ThemePrefContext';
import { DataContext } from './Framework/Common/DataContext';

// temp warning disabling
LogBox.ignoreLogs(['new NativeEventEmitter']);

// nav
const Stack = createNativeStackNavigator();

// TAKENOTE: insert your screens here
function SampleScreen({ navigation, route, extraData }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SamplePage navigation={navigation} route={route} />
    </View>
  );
}

// main
const App = () => {
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
    const newUserData = await getLocalUserData();
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
            <NavigationContainer theme={theme}>
              <Stack.Navigator
                initialRouteName="home"
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="home">
                  {/* TAKENOTE: insert your screens here */}
                  {(props) => <SampleScreen {...props} extraData={{}} />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </MenuProvider>
        </PaperProvider>
      </DataContext.Provider>
    </ThemePrefContext.Provider>
  );
};

export default App;