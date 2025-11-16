import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '../../UI/Core/Misc/Avatar';
import { Popup } from '../../UI/Core/Modal/Popup';
import { MenuList } from '../../UI/Core/Menu/MenuList';
import { VerticalLayout } from '../../UI/Core/Layout/Layout';
import { useAuth } from '../../Managers/Firebase/FirebaseAuthManager';
import type { MenuOption } from '../../UI/Core/Menu/MenuListItem.types';

/******************************************************************************************************************
 * ProfileMenu: renders the authenticated user's avatar and dropdown menu of account actions.
 ******************************************************************************************************************/
export const ProfileMenu = memo(() => {
  // auth props
  const { user, signIn, signOut } = useAuth();
  const isAnon = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email = user?.email || '';

  // menu options dependent on auth state
  const options: MenuOption[] = isAnon
    ? [{ text: 'Sign in with Google', value: 'signin', icon: 'google' }]
    : [
      {
        text: email ? `Signed in as ${email}` : 'Signed in',
        value: 'noop',
        icon: 'account',
        disabled: true,
      },
      { text: 'Sign out', value: 'signout', icon: 'logout' },
    ];

  // trigger sign-in/sign-out
  const handleSelect = async (value: string) => {
    if (value === 'signin') await signIn();
    if (value === 'signout') await signOut();
  };

  return (
    <Popup
      triggerComp={<Avatar uri={photoURL} label="A" size="md" />}
      triggerContainerStyle={styles.triggerContainer}
    >
      <VerticalLayout>
        <MenuList options={options} onSelect={handleSelect} dense showDividers />
      </VerticalLayout>
    </Popup>
  );
});

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  triggerContainer: {
    borderRadius: 9999,
    overflow: 'hidden', // ensures circular ripple
  },
});
