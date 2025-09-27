import React, { JSX, memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from '../Screen';
import { Popup } from '../../UI/Popup';
import { MenuOption, MenuList } from '../../UI/Menu/Click/MenuList';
import { Managers } from 'framework';
import * as Const from '../../Const';

export interface ActivityOptions {
  showProfile?: boolean;
}

/******************************************************************************************************************
 * Renders the profile avatar as the popup trigger and the auth options using <MenuList dense>.
 *
 * @param props - auth data and handlers:
 *   - photoURL?: string      - optional avatar image
 *   - email?: string         - optional email (shown as a disabled row when signed in)
 *   - isAnonymous: bool      - true if user is anonymous or no user
 *   - onSignIn: fn           - sign in function
 *   - onSignOut: fn          - sign out function
 ******************************************************************************************************************/
const ProfileMenu: React.FC<{
  photoURL?: string;
  email?: string;
  isAnonymous: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}> = memo(({ photoURL, email, isAnonymous, onSignIn, onSignOut }) => {
  // build menu options: single-tap actions, no active state
  const options: MenuOption[] = isAnonymous
    ? [
        { label: 'Sign in with Google', value: 'signin', leadingIcon: 'google' },
      ]
    : [
        { label: email ? `Signed in as ${email}` : 'Signed in', value: 'noop', leadingIcon: 'account', disabled: true },
        { label: 'Sign out', value: 'signout', leadingIcon: 'logout' },
      ];

  // trigger avatar
  const triggerAvatar = photoURL
    ? <Avatar.Image size={Const.iconSizeMedium} source={{ uri: photoURL }} />
    : <Avatar.Icon size={Const.iconSizeMedium} icon='account-circle' />;

  const handleSelect = async (value: string) => {
    switch (value) {
      case 'signin':
        await onSignIn();
        break;
      case 'signout':
        await onSignOut();
        break;
      default:
        // 'noop' or unknown values: do nothing
        break;
    }
  };

  return (
    <Popup triggerComp={triggerAvatar}>
      <View style={{ padding: Const.padSize }}>
      <MenuList options={options} onSelect={handleSelect} dense showDividers />
      </View>
    </Popup>
  );
});

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
  opts,
  children,
}) => {
  const { showProfile } = useMemo(
    () => ({ showProfile: opts?.showProfile ?? true }),
    [opts?.showProfile],
  );

  // auth from shared provider
  const { user, signIn, signOut } = Managers.useAuth();
  const canGoBack = navigation.canGoBack();
  const isAnon   = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email    = user?.email || '';

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}

        {/* flexible spacer for custom header content */}
        <View style={{ flex: 1 }}>
          {CustomHeader && <CustomHeader />}
        </View>

        {/* profile popup */}
        <View style={{ marginHorizontal: Const.padSize }}>
          {showProfile && (
            <ProfileMenu
              photoURL={photoURL}
              email={email}
              isAnonymous={isAnon}
              onSignIn={signIn}
              onSignOut={signOut}
            />
          )}
        </View>
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
});
