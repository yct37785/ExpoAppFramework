import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Core, Managers, UI } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  const { user, signIn, signOut } = Managers.useAuth();
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = getItem('isDarkMode');
  
  function CustomHeader() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch
        value={!!isDarkMode}
        onValueChange={(val) => setItem('isDarkMode', val)}
      />
    </View>
  }

  function renderScreenBtn(screen: string, btnText: string) {
    return <Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: `hello from home` })}>
      {btnText}
    </Button>
  }

  function renderAuthOptions() {
    return <>
      <Text variant='bodyMedium' style={{ marginBottom: 16 }}>
        {user ? `Signed in as ${user.email ?? user.uid}` : 'Not signed in'}
      </Text>

      {user ? (
        <Button mode='outlined' onPress={signOut}>
          Sign out
        </Button>
      ) : (
        <Button mode='contained' onPress={signIn}>
          Sign in with Google
        </Button>
      )}
    </>
  }

  return (
    <Core.Activity navigation={navigation} CustomHeader={CustomHeader} title='Home Sample' isRootActivity={true}>
      <UI.VerticalLayout>
        {renderAuthOptions()}
        <Text variant='bodyMedium'>Select the screen you want to navigate to</Text>
        {renderScreenBtn('layout', 'layouts example')}
        {renderScreenBtn('menu', 'menus example')}
        {renderScreenBtn('list', 'list example')}
        {renderScreenBtn('container', 'containers example')}
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(HomeScreen);