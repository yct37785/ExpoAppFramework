import React, { JSX, memo, useMemo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Appbar, Menu, Avatar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from './Screen';
import { Managers } from 'framework';

export interface ActivityOptions {
  showProfile?: boolean;
}

type ActivityProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  title?: string;
  CustomHeader?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  opts?: ActivityOptions;
  children: React.ReactNode;
};

/******************************************************************************************************************
 * Screen layout with standardized app bar + content area.
 * ----------------------------------------------------------------------------------------------------------------
 * Provides a consistent app layout with:
 *   - Header (Appbar) containing back navigation, title, custom header actions.
 *   - Optional profile avatar with sign-in/sign-out menu integrated with FirebaseAuthManager.
 *   - Flexible body container for screen content.
 *
 * @param props - rendering params:
 *   - navigation: NativeStackNavigationProp - stack navigation controller
 *   - title?: string - title text for the app bar
 *   - CustomHeader?: JSX.Element - component renderer for additional header actions
 *   - style?: StyleProp<ViewStyle> - optional container styling
 *   - opts?: ActivityOptions - config options bag:
 *     + showProfile?: boolean - whether to display the profile avatar + auth menu
 *   - children: ReactNode - body content to render inside layout
 *
 * @usage
 * ```tsx
 * <Activity
 *   navigation={navigation}
 *   title='Home'
 *   CustomHeader={() => <MyHeaderActions />}
 *   opts={{ showProfile: true }}
 * >
 *   <Text>Welcome to the home screen</Text>
 * </Activity>
 * ```
 ******************************************************************************************************************/
export const Activity: React.FC<ActivityProps> = memo(({
  navigation,
  title = '',
  CustomHeader,
  style = {},
  opts,
  children,
}) => {
  const { showProfile } = useMemo(() => ({
    showProfile: opts?.showProfile ?? true,
  }), [opts?.showProfile]);

  const { user, signIn, signOut } = Managers.useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu  = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const isAnon   = !!user?.isAnonymous;
  const photoURL = user?.photoURL || undefined;
  const email    = user?.email || '';

  const onPressSignIn  = async () => { closeMenu(); await signIn(); };
  const onPressSignOut = async () => { closeMenu(); await signOut(); };

  return (
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        {/* always show back button if navigation can go back */}
        {navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}

        {/* flexible spacer for custom header content */}
        <View style={{ flex: 1 }}>
          {CustomHeader && CustomHeader()}
        </View>

        {/* profile avatar with sign in/out menu */}
        {showProfile ? (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                accessibilityLabel='Profile menu'
                onPress={openMenu}
                icon={() =>
                  photoURL
                    ? <Avatar.Image size={28} source={{ uri: photoURL }} />
                    : <Avatar.Icon size={28} icon='account-circle' />
                }
              />
            }
          >
            {isAnon || !user ? (
              <Menu.Item
                title='Sign in with Google'
                onPress={onPressSignIn}
                leadingIcon='google'
              />
            ) : (
              <>
                <Menu.Item
                  title={email ? `Signed in as ${email}` : 'Signed in'}
                  disabled
                  leadingIcon='account'
                />
                <Menu.Item
                  title='Sign out'
                  onPress={onPressSignOut}
                  leadingIcon='logout'
                />
              </>
            )}
          </Menu>
        ) : null}
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
});
