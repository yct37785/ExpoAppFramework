import React, { memo } from 'react';
import { View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Touchable } from '../UI/Interactive/Touchable';
import { Text } from '../UI/Text/Text';
import { AppBarType } from './AppBar.types';
import * as Const from '../Const';

/******************************************************************************************************************
 * AppBar implementation.
 ******************************************************************************************************************/
export const AppBar: AppBarType = memo(
  ({ title, onBack, left, right, style }) => {
    const theme = useTheme();

    return (
      <Appbar.Header
        elevated={true}
        style={style}
      >
        {/* back button */}
        {onBack ? (
          <Touchable onPress={onBack}>
            <Appbar.BackAction
              onPress={onBack}
              color={theme.colors.onSurface}
            />
          </Touchable>
        ) : (
          null
        )}

        {/* title / custom component */}
        {title ? (
          <View style={{ marginLeft: Const.padSize }}>
            <Text variant='titleLarge'>{title}</Text>
          </View>
        ) : null}

        {/* left slot */}
        <View style={{ flex: 1 }}>
          {left ? <View style={{ marginLeft: Const.padSize }}>{left}</View> : null}
        </View>

        {/* right slot */}
        {right ? <View style={{ marginRight: Const.padSize }}>{right}</View> : null}
      </Appbar.Header>
    );
  }
);

AppBar.displayName = 'AppBar';
