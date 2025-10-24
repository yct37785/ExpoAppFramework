import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen, Managers, UI } from 'framework';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: Screen.ScreenType = ({ navigation, route }) => {
  const { user } = Managers.useAuth();

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
        <UI.Text variant='bodyMedium'>
          {statusText}
        </UI.Text>
      </>
    );
  };

  const SECTIONS: string[] = ['Test', 'Container', 'Layout', 'Others'];
  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout>
        {renderAuthSection()}

        <UI.Text variant='bodyMedium' style={{ marginTop: 16 }}>
          Select the screen you want to navigate to
        </UI.Text>

        <UI.AccordionContainer sectionTitles={SECTIONS}>
          <UI.VerticalLayout>
            {renderScreenBtn('testbed', 'test bed')}
          </UI.VerticalLayout>
          <UI.VerticalLayout>
            {renderScreenBtn('collapsible', 'collapsible')}
            {renderScreenBtn('tabs', 'tabs')}
          </UI.VerticalLayout>
          <UI.VerticalLayout>
            {renderScreenBtn('layout', 'layouts')}
          </UI.VerticalLayout>
          <UI.VerticalLayout>
            {renderScreenBtn('typography', 'typography')}
            {renderScreenBtn('menu', 'menus')}
            {renderScreenBtn('list', 'list')}
            {renderScreenBtn('collapsible', 'collapsible')}
            {renderScreenBtn('tabs', 'tabs')}
          </UI.VerticalLayout>
        </UI.AccordionContainer>
        
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(HomeScreen);