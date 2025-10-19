// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// core
import React, { memo, useEffect } from 'react';
import { View, StatusBar, Platform, LogBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// UI
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen typing
import { RootStackPropsList, ScreenProps, ScreenMap } from '../Core/Screen';
// data
import { useLocalData, LocalDataProvider } from '../Managers/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
// auth
import { AuthProvider, useAuth } from '../Managers/Firebase/FirebaseAuthManager';
// utils
import { doLog } from '../Utils/General';
import { logColors } from '../Const';
// app chrome
import { AppBar } from './AppBar';
import { Avatar } from '../UI/Others/Avatar';
import { Popup } from '../UI/General/Popup';
import { MenuOption } from '../UI/Menu/Click/MenuList.types';
import { MenuList } from '../UI/Menu/Click/MenuList';

LogBox.ignoreLogs(['new NativeEventEmitter']);

/******************************************************************************************************************
 * Navigation theme adaptation (Paper ↔ React Navigation).
 * Keep these at module scope so they’re stable across renders.
 ******************************************************************************************************************/
const { LightTheme: NavLight, DarkTheme: NavDark } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

/******************************************************************************************************************
 * ProfileMenu — Renders the authenticated user's avatar and dropdown menu.
 * 
 * Used globally in Root's AppBar to handle sign-in/sign-out actions.
 *
 * @property photoURL?   - Optional profile picture URL for the avatar.
 * @property email?      - Signed-in user's email address (displayed in menu).
 * @property isAnonymous - Whether the current user is anonymous (no account linked).
 * @property onSignIn    - Called when the user selects “Sign in with Google”.
 * @property onSignOut   - Called when the user selects “Sign out”.
 ******************************************************************************************************************/
const ProfileMenu: React.FC<{
  photoURL?: string;
  email?: string;
  isAnonymous: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}> = ({ photoURL, email, isAnonymous, onSignIn, onSignOut }) => {
  const options: MenuOption[] = isAnonymous
    ? [{ label: 'Sign in with Google', value: 'signin', leadingIcon: 'google' }]
    : [
        {
          label: email ? `Signed in as ${email}` : 'Signed in',
          value: 'noop',
          leadingIcon: 'account',
          disabled: true,
        },
        { label: 'Sign out', value: 'signout', leadingIcon: 'logout' },
      ];

  const handleSelect = async (value: string) => {
    if (value === 'signin') await onSignIn();
    if (value === 'signout') await onSignOut();
  };

  return (
    <Popup triggerComp={<Avatar uri={photoURL} label="A" size="md" />}>
      <MenuList options={options} onSelect={handleSelect} dense showDividers />
    </Popup>
  );
};

const Stack = createNativeStackNavigator<RootStackPropsList>();

/******************************************************************************************************************
 * AppBarOptions — Per-screen options that control the universal AppBar rendered by Root.
 *
 * @property showBack?    - Show the back button when possible; default: navigation.canGoBack()
 * @property showProfile? - Show the profile/avatar menu on the right; default: true
 ******************************************************************************************************************/
export type AppBarOptions = {
  showBack?: boolean;
  showProfile?: boolean;
};

/******************************************************************************************************************
 * ScreenChrome — Universal layout wrapper providing AppBar + SafeAreaView for all screens.
 * 
 * Injected automatically by Root so individual screens do not need their own Activity wrapper.
 *
 * @property Component  - The screen component being rendered. May include static:
 *                         + screenTitle?: string
 *                         + LeftContent?: React.FC
 *                         + appBarOptions?: AppBarOptions
 * @property navigation - React Navigation object for handling navigation actions.
 * @property route      - React Navigation route containing screen metadata.
 ******************************************************************************************************************/
const ScreenChrome = ({
  Component,
  navigation,
  route,
}: {
  Component: React.FC<ScreenProps> & {
    screenTitle?: string;
    LeftContent?: React.FC | null;
    appBarOptions?: AppBarOptions;
  };
} & ScreenProps) => {
  const { user, signIn, signOut } = useAuth();
  const theme = useTheme();

  const LeftContentComp = Component.LeftContent ?? null;
  const opts = Component.appBarOptions ?? {};

  const isAnon = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email = user?.email || '';

  const title = Component.screenTitle ?? route.name;
  const showBack = opts.showBack && navigation.canGoBack();
  const showProfile = opts.showProfile ?? true;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar
        title={title}
        onBack={showBack ? () => navigation.goBack() : undefined}
        left={LeftContentComp ? <LeftContentComp /> : undefined}
        right={
          showProfile ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 8 }}>
                <ProfileMenu
                  photoURL={photoURL}
                  email={email}
                  isAnonymous={isAnon}
                  onSignIn={signIn}
                  onSignOut={signOut}
                />
              </View>
            </View>
          ) : undefined
        }
      />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <Component navigation={navigation} route={route} />
      </SafeAreaView>
    </View>
  );
};

/******************************************************************************************************************
 * Root component props.
 *
 * @property DEFAULT_SCREEN - Initial route name for the stack navigator
 * @property screenMap      - Mapping of route names to screen components
 ******************************************************************************************************************/
type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
};

/******************************************************************************************************************
 * RootApp
 *
 * Single gate that:
 *  1) Waits for LocalData to load and reads `isDarkMode`.
 *  2) Chooses Paper MD3 theme + adapted React Navigation theme (no custom theme).
 *  3) Mounts providers and NavigationContainer.
 *
 * NOTE:
 *  - Hooks are always called in the same order; we avoid early returns before hooks.
 *  - We gate effect work with `if (!isLoaded) return;` and gate UI via conditional JSX.
 ******************************************************************************************************************/
const RootApp: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap }) => {
  const { isLoaded, getItem } = useLocalData();

  // derive a safe value even when not loaded yet (avoid conditional hooks)
  const isDarkMode = isLoaded ? !!getItem<boolean>('isDarkMode') : false;

  // pick theme
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDarkMode ? NavDark : NavLight;

  // Firebase pulse check (once we have LocalData)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const firebaseApp = getApp();
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${String(err)}`);
    }
  }, [isLoaded]);

  // status bar icons based on theme (NavContainer handles bar colors)
  useEffect(() => {
    const bar = isDarkMode ? 'light-content' : 'dark-content';
    StatusBar.setBarStyle(bar, true);
    if (Platform.OS === 'android') {
      // Optionally: StatusBar.setBackgroundColor could be set to navTheme.colors.background
      // if using custom fullscreen layout
    }
  }, [isDarkMode]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <AuthProvider>
          <MenuProvider>
            {/* gate the rendered tree, not the hooks */}
            {!isLoaded ? (
              <View style={{ flex: 1 }} />
            ) : (
              <NavigationContainer theme={navTheme}>
                <Stack.Navigator initialRouteName={DEFAULT_SCREEN} screenOptions={{ headerShown: false }}>
                  {Object.entries(screenMap).map(([name, Component]) => (
                    <Stack.Screen name={name} key={name}>
                      {(props) => (
                        <ScreenChrome
                          Component={Component as React.FC<ScreenProps> & { screenTitle?: string }}
                          navigation={props.navigation}
                          route={props.route}
                        />
                      )}
                    </Stack.Screen>
                  ))}
                </Stack.Navigator>
              </NavigationContainer>
            )}
          </MenuProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide LocalData context around RootApp and export the wrapped app entry.
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <LocalDataProvider>
      <RootApp {...props} />
    </LocalDataProvider>
  );
};

export default memo(AppEntry);
