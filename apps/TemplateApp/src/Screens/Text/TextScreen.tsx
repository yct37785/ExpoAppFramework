import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Typography demo
 ******************************************************************************************************************/
const TypographyScreen: Screen.ScreenType = ({ navigation }) => {

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll'>
        {/* text */}
        <UI.Text variant='headlineMedium'>Headline Medium</UI.Text>
        <UI.Text variant='titleMedium'>Title Medium</UI.Text>
        <UI.Text variant='bodyMedium'>Body Medium</UI.Text>
        <UI.Text variant='labelMedium'>Label Medium</UI.Text>
        <UI.Divider />
        {/* text color */}
        <UI.Text color='default'>Default color text</UI.Text>
        <UI.Text color='label'>Label color text</UI.Text>
        <UI.Text color='error'>Error color text</UI.Text>
        <UI.Text color='disabled'>Disabled color text</UI.Text>
        <UI.Text color='primary'>Primary color text</UI.Text>
        <UI.Divider />
        {/* highlight text */}
        <UI.HighlightText
          variant='bodyMedium'
          query='highlight text'
        >
          This is a sentence containing highlight text which should be highlighted.
        </UI.HighlightText>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TypographyScreen);
