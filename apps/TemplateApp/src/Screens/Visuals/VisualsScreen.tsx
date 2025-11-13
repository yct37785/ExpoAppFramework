import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * 
 ******************************************************************************************************************/
const EmptyScreen: Screen.ScreenType = ({ navigation, route }) => {
  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        <UI.Text variant='labelLarge'>Empty screen</UI.Text>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(EmptyScreen);
