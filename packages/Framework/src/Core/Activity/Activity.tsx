import React, { JSX, memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackPropsList } from '../Screen';
import { ProfileOptions } from './ProfileOptions';
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
    <View style={[{ flex: 1 }, style]}>
      <Appbar.Header>
        {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        {title ? <Appbar.Content style={{ flex: 0 }} title={title} /> : null}

        {/* flexible spacer for custom header content */}
        <View style={{ flex: 1 }}>
          {CustomHeader && <CustomHeader />}
        </View>

        {/* profile popup */}
        {showProfile && (
          <ProfileOptions
            photoURL={photoURL}
            email={email}
            isAnonymous={isAnon}
            onSignIn={signIn}
            onSignOut={signOut}
          />
        )}
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
});
