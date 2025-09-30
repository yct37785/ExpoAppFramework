import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Avatar, TouchableRipple, List } from 'react-native-paper';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

/******************************************************************************************************************
 * ProfileOptions props.
 *
 * @param props - Behavior and data for the auth menu:
 *   - photoURL?    - Optional avatar photo URL; if not present, a default account-circle icon is used
 *   - email?       - Optional user email to display when signed in
 *   - isAnonymous  - Whether the current user is anonymous or unauthenticated
 *   - onSignIn     - Async sign-in handler (e.g., Google)
 *   - onSignOut    - Async sign-out handler
 ******************************************************************************************************************/
export interface ProfileOptionsProps {
  photoURL?: string;
  email?: string;
  isAnonymous: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

/******************************************************************************************************************
 * ProfileOptions (avatar trigger + popup auth menu)
 *
 * @param props - Refer to ProfileOptionsProps
 ******************************************************************************************************************/
export const ProfileOptions: React.FC<ProfileOptionsProps> = memo(({
  photoURL,
  email,
  isAnonymous,
  onSignIn,
  onSignOut,
}) => {
  // avatar trigger element
  const TriggerAvatar = useMemo(
    () =>
      photoURL
        ? <Avatar.Image size={28} source={{ uri: photoURL }} />
        : <Avatar.Icon size={28} icon='account-circle' />,
    [photoURL],
  );

  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableRipple,
          triggerWrapper: { borderRadius: 9999 }, // make ripple circular around the avatar
        }}
      >
        {TriggerAvatar}
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: { paddingVertical: 4 },
        }}
      >
        {isAnonymous ? (
          // sign in option
          <MenuOption
            onSelect={async () => { await onSignIn(); }}
            customStyles={{
              optionWrapper: { padding: 0 }, // remove default padding to let TouchableRipple control it
            }}
          >
            <TouchableRipple onPress={async () => { await onSignIn(); }}>
              <View>
                <List.Item title='Sign in with Google' left={(p) => <List.Icon {...p} icon='google' />} />
              </View>
            </TouchableRipple>
          </MenuOption>
        ) : (
          <>
            {/* display email */}
            <MenuOption
              onSelect={() => {}}
              customStyles={{ optionWrapper: { padding: 0 } }}
            >
              <TouchableRipple disabled>
                <View>
                  <List.Item
                    title={email ? `Signed in as ${email}` : 'Signed in'}
                    left={(p) => <List.Icon {...p} icon='account' />}
                  />
                </View>
              </TouchableRipple>
            </MenuOption>

            {/* sign out option */}
            <MenuOption
              onSelect={async () => { await onSignOut(); }}
              customStyles={{ optionWrapper: { padding: 0 } }}
            >
              <TouchableRipple onPress={async () => { await onSignOut(); }}>
                <View>
                  <List.Item title='Sign out' left={(p) => <List.Icon {...p} icon='logout' />} />
                </View>
              </TouchableRipple>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
});
