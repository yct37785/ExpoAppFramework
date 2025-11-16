import React, { memo, useEffect } from 'react';
import { Screen, Managers, UI } from 'framework';
import { screenRoutes } from './ScreenRegistry';

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

  const renderScreenBtn = (screen: string) => (
    <UI.Button mode='contained' onPress={() => navigation.navigate(screen, { paramText: 'hello from home' })}>
      {screen}
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

  const SECTIONS = [
    { text: 'Test' },
    { text: 'Container' },
    { text: 'Data' },
    { text: 'Input' },
    { text: 'Interactive' },
    { text: 'Layout' },
    { text: 'Menu' },
    { text: 'Misc' },
    { text: 'Modal' },
    { text: 'Options' },
    { text: 'Selections' },
    { text: 'Text' },
    { text: 'Visuals' },
  ];

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        {renderAuthSection()}

        <UI.Box mt={2}>
          <UI.Text variant='bodyMedium'>
            Select the screen you want to navigate to
          </UI.Text>
        </UI.Box>

        <UI.AccordionContainer sections={SECTIONS}>
          {/* Test */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.testbed)}
          </UI.VerticalLayout>

          {/* Container */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.box)}
            {renderScreenBtn(screenRoutes.collapsibles)}
            {renderScreenBtn(screenRoutes.tabs)}
          </UI.VerticalLayout>

          {/* Data */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.list)}
          </UI.VerticalLayout>

          {/* Input */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.inputs)}
          </UI.VerticalLayout>

          {/* Interactive */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.interactives)}
          </UI.VerticalLayout>

          {/* Layout */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.layouts)}
          </UI.VerticalLayout>

          {/* Menu */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.menu)}
          </UI.VerticalLayout>

          {/* Misc */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.misc)}
          </UI.VerticalLayout>

          {/* Modal */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.modals)}
          </UI.VerticalLayout>

          {/* Options */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.options)}
          </UI.VerticalLayout>

          {/* Options */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.selections)}
          </UI.VerticalLayout>

          {/* Text */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.text)}
          </UI.VerticalLayout>

          {/* Visuals */}
          <UI.VerticalLayout>
            {renderScreenBtn(screenRoutes.visuals)}
          </UI.VerticalLayout>
        </UI.AccordionContainer>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(HomeScreen);