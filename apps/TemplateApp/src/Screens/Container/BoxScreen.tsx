import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Box demo
 ******************************************************************************************************************/
const BoxScreen: Screen.ScreenType = ({ navigation, route }) => {
  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        <UI.Text variant='titleMedium'>Box</UI.Text>
        <UI.Box bgColor='#2eb82e'>
          <UI.Text>Use Box like a view</UI.Text>
        </UI.Box>
        <UI.Box p={1} bgColor='#ff2600ff' dir='row' justify='center'>
          <UI.Box bgColor='#9de923ff'>
            <UI.Text>dir = row</UI.Text>
          </UI.Box>
        </UI.Box>
        <UI.Box style={{ height: 150 }} p={1} bgColor='#ff2600ff' dir='column' justify='center'>
          <UI.Box bgColor='#9de923ff'>
            <UI.Text>dir = column</UI.Text>
          </UI.Box>
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(BoxScreen);
