import React, { memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Core, Managers, UI } from 'framework';

/******************************************************************************************************************
 * Home screen
 * - Shows current auth mode + uid
 *   - Anonymous: "Sign in with Google" + "anonymous account mode, uid: <uid>"
 *   - Google    : "Sign out"            + "Signed in with Google, uid: <uid>"
 ******************************************************************************************************************/
const HomeScreen: React.FC<Core.ScreenProps> = ({ navigation }) => {
  const { user, signIn, signOut } = Managers.useAuth();
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = getItem('isDarkMode');

  const CustomHeader = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch value={!!isDarkMode} onValueChange={(val) => setItem('isDarkMode', val)} />
    </View>
  );

  const renderScreenBtn = (screen: string, btnText: string) => (
    <Button mode="contained" onPress={() => navigation.navigate(screen, { paramText: 'hello from home' })}>
      {btnText}
    </Button>
  );

  const renderAuthSection = () => {
    // While the provider is bootstrapping, user might be temporarily null; your AuthProvider
    // ensures an anonymous session shortly after launch.
    const isAnon = !!user?.isAnonymous;
    const uid = user?.uid;

    let statusText = 'Setting up session...';
    if (user) {
      statusText = isAnon
        ? `anonymous account mode, uid: ${uid}`
        : `Signed in with Google, uid: ${uid}`;
    }

    return (
      <>
        <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
          {statusText}
        </Text>

        {isAnon || !user ? (
          <Button mode="contained" onPress={signIn} accessibilityLabel="Sign in with Google">
            Sign in with Google
          </Button>
        ) : (
          <Button mode="outlined" onPress={signOut} accessibilityLabel="Sign out">
            Sign out
          </Button>
        )}
      </>
    );
  };

  return (
    <Core.Activity navigation={navigation} CustomHeader={CustomHeader} title="Home Sample" isRootActivity>
      <UI.VerticalLayout>
        {renderAuthSection()}

        <Text variant="bodyMedium" style={{ marginTop: 16 }}>
          Select the screen you want to navigate to
        </Text>

        {renderScreenBtn('layout', 'layouts example')}
        {renderScreenBtn('menu', 'menus example')}
        {renderScreenBtn('list', 'list example')}
        {renderScreenBtn('container', 'containers example')}
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(HomeScreen);
