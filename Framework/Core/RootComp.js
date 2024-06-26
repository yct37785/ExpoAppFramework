/***************************************************************************************
* engine of entire app, handles initialization, contexts and navigation of screens
***************************************************************************************/
// core
import React, { Node, useCallback, useMemo, useEffect, useState } from 'react';
import { View, LogBox, Platform, StatusBar } from 'react-native';
// UI
import { Provider as PaperProvider, useTheme, adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, Appbar } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { padSize } from '../Index/CommonVals';
// data
import { LocalDataContext } from '../Contexts/LocalDataContext';
import useLocalDataManager from '../Managers/LocalDataManager';
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

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();

/**
 * A wrapper for screens to standardize their layout.
 * 
 * @param {Object} props - The props passed to the screen.
 * @param {React.ComponentType} props.component - The screen component to render.
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
 * @param {Object} props.screenMaps - A mapping of screen names to their respective components, refer to TemplateApp > App.js.
 * @param {Object} props.screenHeaderMaps - A mapping of screen custom headers mapped to corresponding screen key, refer to TemplateApp > App.js.
 * @param {string} props.DEFAULT_SCREEN - The default screen to display on app launch, refer to TemplateApp > App.js.
 * @param {Object} props.NEW_USER_DATA - The schema for new user data, refer to TemplateApp > App.js.
 * @returns {JSX.Element} The root component of the app.
 */
const RootComp = ({ screenMaps, screenHeaderMaps, DEFAULT_SCREEN, NEW_USER_DATA }) => {
  const localDataManager = useLocalDataManager({ NEW_USER_DATA });
  const [theme, setTheme] = useState(CombinedDarkTheme);

  useEffect(() => {
    const isDarkMode = localDataManager.getLocalDataValue("settings_sample.isDarkMode");
    if (localDataManager.isLocalDataLoaded && (isDarkMode !== (theme === CombinedDarkTheme))) {
      const newTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
      console.log("RootComp: toggle dark mode: " + localDataManager.getLocalDataValue("settings_sample.isDarkMode"));
      setTheme(newTheme);
    }
  }, [localDataManager.updateCount, localDataManager.isLocalDataLoaded]);

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