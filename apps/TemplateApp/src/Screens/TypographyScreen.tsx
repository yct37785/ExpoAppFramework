import React, { memo } from 'react';
import { Core, UI } from 'framework';

/******************************************************************************************************************
 * Typography demo
 ******************************************************************************************************************/
const TypographyScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {

  return (
    <Core.Activity navigation={navigation} title='Layout Sample'>
      <UI.VerticalLayout constraint='scroll'>
        {/* display text */}
        <UI.Text variant='displayLarge'>Hello World</UI.Text>
        <UI.Text variant='displayMedium'>Hello World</UI.Text>
        <UI.Text variant='displaySmall'>Hello World</UI.Text>
        {/* headline text */}
        <UI.Text variant='headlineLarge'>Hello World</UI.Text>
        <UI.Text variant='headlineMedium'>Hello World</UI.Text>
        <UI.Text variant='headlineSmall'>Hello World</UI.Text>
        <UI.Divider />
        {/* title text */}
        <UI.Text variant='titleLarge'>Hello World</UI.Text>
        <UI.Text variant='titleMedium'>Hello World</UI.Text>
        <UI.Text variant='titleSmall'>Hello World</UI.Text>
        <UI.Divider />
        {/* label text */}
        <UI.Text variant='labelLarge'>Hello World</UI.Text>
        <UI.Text variant='labelMedium'>Hello World</UI.Text>
        <UI.Text variant='labelSmall'>Hello World</UI.Text>
        <UI.Divider />
        {/* body text */}
        <UI.Text variant='bodyLarge'>Hello World</UI.Text>
        <UI.Text variant='bodyMedium'>Hello World</UI.Text>
        <UI.Text variant='bodySmall'>Hello World</UI.Text>
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
    </Core.Activity>
  );
};

export default memo(TypographyScreen);