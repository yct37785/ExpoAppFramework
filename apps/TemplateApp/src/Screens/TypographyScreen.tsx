import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Core, Theme, UI } from 'framework';

/******************************************************************************************************************
 * Typography demo
 ******************************************************************************************************************/
const TypographyScreen: React.FC<Core.ScreenProps> = ({ navigation, route }) => {
  const theme = Theme.useTheme();

  return (
    <Core.Activity navigation={navigation} title='Layout Sample'>
      <UI.VerticalLayout constraint='scroll' navBarScrollAllowance>
        {/* header text */}
        <UI.Text variant='h1'>Hello World h1</UI.Text>
        <UI.Text variant='h2'>Hello World h2</UI.Text>
        <UI.Text variant='h3'>Hello World h3</UI.Text>
        <UI.Text variant='h4'>Hello World h4</UI.Text>
        <UI.Text variant='h5'>Hello World h5</UI.Text>
        <UI.Text variant='h6'>Hello World h6</UI.Text>
        <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.border }} />
        {/* body text */}
        <UI.Text variant='body'>Hello World body</UI.Text>
        <UI.Text variant='body2'>Hello World body2</UI.Text>
        <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.border }} />
        {/* label text */}
        <UI.Text variant='label'>Hello World label</UI.Text>
        <UI.Text variant='label2'>Hello World label2</UI.Text>
        <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.border }} />
        {/* caption + overline text */}
        <UI.Text variant='caption'>Hello World caption</UI.Text>
        <UI.Text variant='overline'>Hello World overline</UI.Text>
        <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.border }} />
        {/* highlight text */}
        <UI.TextHighlight
          variant='body'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI.TextHighlight>
        <UI.TextHighlight
          variant='label'
          query='react'
        >
          React Native makes mobile development easy with React.
        </UI.TextHighlight>
      </UI.VerticalLayout>
    </Core.Activity>
  );
};

export default memo(TypographyScreen);