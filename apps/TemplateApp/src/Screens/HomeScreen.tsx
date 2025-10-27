import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
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
    <UI.Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: 'hello from home' })}>
      {btnText}
    </UI.Button>
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

  const SECTIONS = ['Test', 'Container', 'Data', 'Input', 'Interactive', 'Layout',
    'Menu', 'Misc', 'Modal', 'Text', 'Visuals'];

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        {renderAuthSection()}

        <UI.Text variant='bodyMedium' style={{ marginTop: 16 }}>
          Select the screen you want to navigate to
        </UI.Text>

        <UI.AccordionContainer sectionTitles={SECTIONS}>
          {/* Test */}
          <UI.VerticalLayout>
            {renderScreenBtn('testbed', 'test bed')}
          </UI.VerticalLayout>
          {/* Container */}
          <UI.VerticalLayout>
            {renderScreenBtn('collapsible', 'collapsible')}
            {renderScreenBtn('tabs', 'tabs')}
          </UI.VerticalLayout>
          {/* Data */}
          <UI.VerticalLayout>
            {renderScreenBtn('list', 'list')}
          </UI.VerticalLayout>
          {/* Input */}
          <UI.VerticalLayout>
            <View />
          </UI.VerticalLayout>
          {/* Interactive */}
          <UI.VerticalLayout>
            <View />
          </UI.VerticalLayout>
          {/* Layout */}
          <UI.VerticalLayout>
            {renderScreenBtn('layout', 'layouts')}
          </UI.VerticalLayout>
          {/* Menu */}
          <UI.VerticalLayout>
            {renderScreenBtn('menu', 'menus')}
          </UI.VerticalLayout>
          {/* Misc */}
          <UI.VerticalLayout>
            <View />
          </UI.VerticalLayout>
          {/* Modal */}
          <UI.VerticalLayout>
            <View />
          </UI.VerticalLayout>
          {/* Text */}
          <UI.VerticalLayout>
            {renderScreenBtn('typography', 'typography')}
          </UI.VerticalLayout>
          {/* Visuals */}
          <UI.VerticalLayout>
            <View />
          </UI.VerticalLayout>
        </UI.AccordionContainer>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(HomeScreen);