import React, { memo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AppBar } from '../UI/Core/Container/AppBar';
import { Avatar } from '../UI/Core/Others/Avatar';
import { Popup } from '../UI/Core/General/Popup';
import { MenuList } from '../UI/Core/Menu/Click/MenuList';
import { VerticalLayout } from '../UI/Core/General/Layouts';
import type { MenuOption } from '../UI/Core/Menu/Click/MenuList.types';
import { useAuth } from '../Managers/Firebase/FirebaseAuthManager';
import * as Const from '../Const';

/******************************************************************************************************************
 * ProfileMenu — Renders the authenticated user's avatar and dropdown menu.
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
    <Popup
      triggerComp={<Avatar uri={photoURL} label='A' size='md' />}
      triggerContainerStyle={{ borderRadius: 9999, overflow: 'hidden' }} // ensures circular ripple
    >
      <VerticalLayout>
        <MenuList options={options} onSelect={handleSelect} dense showDividers />
      </VerticalLayout>
    </Popup>
  );
};

/******************************************************************************************************************
 * Screen wrapper props.
 * 
 * @property showTitle?    - To show title text for the AppBar (default: false)
 * @property title?        - Title text for the AppBar (defaults to current route name) if showTitle is true
 * @property showBack?     - Show a back button (defaults to navigation.canGoBack())
 * @property showProfile?  - Show the profile/avatar menu on the right (default: true)
 * @property LeftContent?  - Optional component rendered in the AppBar’s left slot (after back button).
 *                           Receives { navigation, route } so it can call into screen logic.
 * @property children      - Screen content rendered below the AppBar inside a SafeAreaView
 ******************************************************************************************************************/
export type ScreenWrapperProps = {
  showTitle?: boolean;
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  LeftContent?: React.FC | null;
  children: React.ReactNode;
};

/******************************************************************************************************************
 * Screen wrapper — Base view for screens (AppBar + SafeAreaView + Profile menu).
 * Use this in each screen to render a consistent top bar and safe-area content wrapper.
 ******************************************************************************************************************/
const ScreenWrapperComponent: React.FC<ScreenWrapperProps> = ({
  showTitle = false,
  title,
  showBack,
  showProfile = true,
  LeftContent,
  children,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { user, signIn, signOut } = useAuth();
  const isAnon = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email = user?.email || '';

  const computedTitle = title ?? (route?.name as string);
  const canGoBack = typeof (navigation as any).canGoBack === 'function' ? (navigation as any).canGoBack() : false;
  const showBackFinal = showBack ?? canGoBack;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar
        title={showTitle ? computedTitle : undefined}
        onBack={showBackFinal ? () => (navigation as any).goBack() : undefined}
        left={LeftContent ? <LeftContent /> : undefined}
        right={
          showProfile ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ProfileMenu
                photoURL={photoURL}
                email={email}
                isAnonymous={isAnon}
                onSignIn={signIn}
                onSignOut={signOut}
              />
            </View>
          ) : undefined
        }
      />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export const ScreenWrapper = memo(ScreenWrapperComponent);
