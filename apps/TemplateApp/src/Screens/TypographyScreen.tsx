import React, { memo } from 'react';
import { Screen, UI_Core } from 'framework';

/******************************************************************************************************************
 * Typography demo
 ******************************************************************************************************************/
const TypographyScreen: Screen.ScreenType = ({ navigation }) => {

  return (
    <Screen.ScreenLayout>
      <UI_Core.VerticalLayout constraint='scroll'>
        {/* display text */}
        <UI_Core.Text variant='displayLarge'>DisplayLarge</UI_Core.Text>
        <UI_Core.Text variant='displayMedium'>Display Medium</UI_Core.Text>
        <UI_Core.Text variant='displaySmall'>Display Small</UI_Core.Text>
        <UI_Core.Divider />
        {/* headline text */}
        <UI_Core.Text variant='headlineLarge'>Headline Large</UI_Core.Text>
        <UI_Core.Text variant='headlineMedium'>Headline Medium</UI_Core.Text>
        <UI_Core.Text variant='headlineSmall'>Headline Small</UI_Core.Text>
        <UI_Core.Divider />
        {/* title text */}
        <UI_Core.Text variant='titleLarge'>Title Large</UI_Core.Text>
        <UI_Core.Text variant='titleMedium'>Title Medium</UI_Core.Text>
        <UI_Core.Text variant='titleSmall'>Title Small</UI_Core.Text>
        <UI_Core.Divider />
        {/* label text */}
        <UI_Core.Text variant='labelLarge'>Label Large</UI_Core.Text>
        <UI_Core.Text variant='labelMedium'>Label Medium</UI_Core.Text>
        <UI_Core.Text variant='labelSmall'>Label Small</UI_Core.Text>
        <UI_Core.Divider />
        {/* body text */}
        <UI_Core.Text variant='bodyLarge'>Body Large</UI_Core.Text>
        <UI_Core.Text variant='bodyMedium'>Body Medium</UI_Core.Text>
        <UI_Core.Text variant='bodySmall'>Body Small</UI_Core.Text>
        <UI_Core.Divider />
        {/* highlight text */}
        <UI_Core.HighlightText
          variant='bodyMedium'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI_Core.HighlightText>
        <UI_Core.HighlightText
          variant='labelMedium'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI_Core.HighlightText>
      </UI_Core.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TypographyScreen);
