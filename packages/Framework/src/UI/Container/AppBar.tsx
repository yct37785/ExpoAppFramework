import React, { memo } from 'react';
import { View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Touchable } from '../Interactive/Touchable';
import { AppBarType } from './AppBar.types';
import * as Const from '../../Const';

/******************************************************************************************************************
 * AppBar implementation.
 ******************************************************************************************************************/
export const AppBar: AppBarType = memo(
  ({ title, TitleComponent, onBack, left, right, elevated = true, style }) => {
    const theme = useTheme();

    return (
      <Appbar.Header
        mode={elevated ? 'center-aligned' : 'small'}
        elevated={elevated}
        style={style}
      >
        {/* left slot or back button */}
        {onBack ? (
          <Touchable onPress={onBack}>
            <Appbar.BackAction
              onPress={onBack}
              color={theme.colors.onSurface}
            />
          </Touchable>
        ) : (
          left ?? null
        )}

        {/* Title / custom component */}
        {TitleComponent ? (
          <TitleComponent />
        ) : title ? (
          <Appbar.Content
            title={title}
            titleStyle={{ color: theme.colors.onSurface }}
          />
        ) : null}

        {/* right slot */}
        {right ? <View style={{ marginRight: Const.padSize }}>{right}</View> : null}
      </Appbar.Header>
    );
  }
);

AppBar.displayName = 'AppBar';
