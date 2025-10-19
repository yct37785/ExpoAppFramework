import React, { memo, useEffect } from 'react';
import { Text, Button, Switch, useTheme } from 'react-native-paper';
import { Core, Managers, UI } from 'framework';

/******************************************************************************************************************
 * LeftContent
 ******************************************************************************************************************/
const LeftContent: React.FC = () => {
  const theme = useTheme();
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = !!getItem<boolean>('isDarkMode');

  return (
    <Switch
      value={isDarkMode}
      onValueChange={(val) => setItem('isDarkMode', val)}
      color={theme.colors.primary}
    />
  );
};

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: React.FC<Core.ScreenProps> = ({ navigation }) => {
  const { user } = Managers.useAuth();
  const { getItem, setItem } = Managers.useLocalData();
  const isDarkMode = getItem('isDarkMode');

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
    <UI.VerticalLayout>
      {renderAuthSection()}

      <Text variant='bodyMedium' style={{ marginTop: 16 }}>
        Select the screen you want to navigate to
      </Text>

      {renderScreenBtn('testbed', 'test bed example')}
      {renderScreenBtn('typography', 'typography example')}
      {renderScreenBtn('layout', 'layouts example')}
      {renderScreenBtn('menu', 'menus example')}
      {renderScreenBtn('list', 'list example')}
      {renderScreenBtn('container', 'containers example')}
    </UI.VerticalLayout>
  );
};

/******************************************************************************************************************
 * Static fields
 ******************************************************************************************************************/
export default Object.assign(memo(HomeScreen), {
  screenTitle: 'Home',
  LeftContent,
  appBarOptions: {
    showBack: false,
    showProfile: true,
  },
});
