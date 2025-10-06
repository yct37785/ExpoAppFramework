import React, { JSX, memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from '../Screen';
import { Managers } from 'framework';
import { AppBar } from '../../UI/Container/AppBar';
import { Avatar } from '../../UI/Avatar';
import { Popup } from '../../UI/Popup';
import { MenuList, type MenuOption } from '../../UI/Menu/Click/MenuList';
import * as Const from '../../Const';

/******************************************************************************************************************
 * Renders the profile avatar as the popup trigger and the auth options.
 *
 * @param props - Auth data and handlers:
 *   - photoURL?    - Optional avatar image
 *   - email?       - Optional email (shown as a disabled row when signed in)
 *   - isAnonymous  - True if user is anonymous or no user
 *   - onSignIn     - Sign in function
 *   - onSignOut    - Sign out function
 ******************************************************************************************************************/
const ProfileMenu: React.FC<{
  photoURL?: string;
  email?: string;
  isAnonymous: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}> = memo(({ photoURL, email, isAnonymous, onSignIn, onSignOut }) => {
  const options: MenuOption[] = isAnonymous
    ? [{ label: 'Sign in with Google', value: 'signin', leadingIcon: 'google' }]
    : [
      { label: email ? `Signed in as ${email}` : 'Signed in', value: 'noop', leadingIcon: 'account', disabled: true },
      { label: 'Sign out', value: 'signout', leadingIcon: 'logout' },
    ];

  const handleSelect = async (value: string) => {
    switch (value) {
      case 'signin':
        await onSignIn();
        break;
      case 'signout':
        await onSignOut();
        break;
      default:
        break;
    }
  };

  return (
    <Popup triggerComp={<Avatar uri={photoURL} label="A" size="md" />}>
      <MenuList options={options} onSelect={handleSelect} dense showDividers />
    </Popup>
  );
});

/******************************************************************************************************************
 * Activity options props.
 * 
 * @property showProfile? - Show profile menu
 ******************************************************************************************************************/
export interface ActivityOptions {
  showProfile?: boolean;
}

/******************************************************************************************************************
 * Activity component props.
 * 
 * @property navigation     - Stack navigation controller
 * @property title?         - Title text for the app bar
 * @property CustomHeader?  - Component renderer for additional header actions
 * @property opts?          - Config options bag
 * @property children       - Body content to render inside layout
 ******************************************************************************************************************/
type ActivityProps<T extends keyof RootStackPropsList = keyof RootStackPropsList> = {
  navigation: NativeStackNavigationProp<RootStackPropsList, T>;
  title?: string;
  CustomHeader?: () => JSX.Element;
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
 * @param props - Refer to ActivityProps
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

  const { user, signIn, signOut } = Managers.useAuth();
  const isAnon   = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email    = user?.email || '';

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title={title}
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {CustomHeader ? <CustomHeader /> : null}
            {showProfile ? (
              <View style={{ marginLeft: 8 }}>
                <ProfileMenu
                  photoURL={photoURL}
                  email={email}
                  isAnonymous={isAnon}
                  onSignIn={signIn}
                  onSignOut={signOut}
                />
              </View>
            ) : null}
          </View>
        }
      />

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </View>
  );
});
