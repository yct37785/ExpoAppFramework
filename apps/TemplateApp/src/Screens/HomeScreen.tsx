import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button, Switch } from 'react-native-paper';
import { Core, Managers, Theme, UI } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: React.FC<Core.ScreenProps> = ({ navigation }) => {
  const { user } = Managers.useAuth();
  const { getItem, setItem } = Managers.useLocalData();
  const { mode } = Theme.useThemeMode();
  const isDarkMode = getItem('isDarkMode');

  useEffect(() => {
    console.log(`Theme mode: ${mode}`);
  }, [mode]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('list all docs...');
  //     const listOfDocs = await Managers.listAllFirestoreDocs('allergies', 'solids');
  //     console.log(listOfDocs);
  //     console.log('read data...');
  //     const docData = await Managers.readFirestoreDoc('allergies', 'solids/peanut');
  //     console.log(docData);
  //   })();
  // }, []);

  const LeftContent = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Switch value={!!isDarkMode} onValueChange={(val) => setItem('isDarkMode', val)} />
    </View>
  );

  const renderScreenBtn = (screen: string, btnText: string) => (
    <Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: 'hello from home' })}>
      {btnText}
    </Button>
  );

  const renderAuthSection = () => {
    // debug purposes only, show the current uid and linked acc if available
    const isAnon = !!user?.isAnonymous;
    const uid = user?.uid;

    let statusText = 'Setting up session...';
    if (user) {
      statusText = isAnon
        ? `anonymous account mode\nuid: ${uid?.slice(0, 10)}..`
        : `Signed in with Google\nuid: ${uid?.slice(0, 10)}..\nGmail: ${user.email}`;
    }

    return (
      <>
        <Text variant='bodyMedium' style={{ marginBottom: 12 }}>
          {statusText}
        </Text>
      </>
    );
  };

  return (
    <Core.Activity navigation={navigation} LeftContent={LeftContent} title='Home Sample'>
      <UI.VerticalLayout>
        {renderAuthSection()}

        <Text variant='bodyMedium' style={{ marginTop: 16 }}>
          Select the screen you want to navigate to
        </Text>
        
        {renderScreenBtn('testbed', 'test bed example')}
        {renderScreenBtn('typography', 'typography example')}
        {/* {renderScreenBtn('layout', 'layouts example')}
        {renderScreenBtn('menu', 'menus example')}
        {renderScreenBtn('list', 'list example')}
        {renderScreenBtn('container', 'containers example')} */}
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(HomeScreen);
