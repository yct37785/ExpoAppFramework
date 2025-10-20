import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Typography demo
 ******************************************************************************************************************/
const TypographyScreen: Screen.ScreenType = ({ navigation }) => {

  return (
    <Screen.ScreenWrapper>
      <UI.VerticalLayout constraint='scroll'>
        {/* display text */}
        <UI.Text variant='displayLarge'>DisplayLarge</UI.Text>
        <UI.Text variant='displayMedium'>Display Medium</UI.Text>
        <UI.Text variant='displaySmall'>Display Small</UI.Text>
        <UI.Divider />
        {/* headline text */}
        <UI.Text variant='headlineLarge'>Headline Large</UI.Text>
        <UI.Text variant='headlineMedium'>Headline Medium</UI.Text>
        <UI.Text variant='headlineSmall'>Headline Small</UI.Text>
        <UI.Divider />
        {/* title text */}
        <UI.Text variant='titleLarge'>Title Large</UI.Text>
        <UI.Text variant='titleMedium'>Title Medium</UI.Text>
        <UI.Text variant='titleSmall'>Title Small</UI.Text>
        <UI.Divider />
        {/* label text */}
        <UI.Text variant='labelLarge'>Label Large</UI.Text>
        <UI.Text variant='labelMedium'>Label Medium</UI.Text>
        <UI.Text variant='labelSmall'>Label Small</UI.Text>
        <UI.Divider />
        {/* body text */}
        <UI.Text variant='bodyLarge'>Body Large</UI.Text>
        <UI.Text variant='bodyMedium'>Body Medium</UI.Text>
        <UI.Text variant='bodySmall'>Body Small</UI.Text>
        <UI.Divider />
        {/* highlight text */}
        <UI.HighlightText
          variant='bodyMedium'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI.HighlightText>
        <UI.HighlightText
          variant='labelMedium'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI.HighlightText>
      </UI.VerticalLayout>
    </Screen.ScreenWrapper>
  );
};

export default memo(TypographyScreen);
