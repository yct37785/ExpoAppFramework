import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Touchable } from '../Interactive/Touchable';
import { Text } from '../Text/Text';
import { AppBarType } from './AppBar.types';
import * as Const from '../../../Const';

/******************************************************************************************************************
 * AppBar implementation.
 ******************************************************************************************************************/
export const AppBar: AppBarType = memo(({ title, onBack, left, right, style }) => {
  const theme = useTheme();

  return (
    <Appbar.Header elevated style={style}>
      {/* back button */}
      {onBack ? (
        <Appbar.BackAction onPress={onBack} color={theme.colors.onSurface} />
      ) : null}

      {/* title */}
      {title ? (
        <View style={styles.titleWrap}>
          <Text variant="titleLarge">{title}</Text>
        </View>
      ) : null}

      {/* left slot (fills remaining width) */}
      <View style={styles.leftSlot}>
        {left ? <View style={styles.leftInner}>{left}</View> : null}
      </View>

      {/* right slot */}
      {right ? <View style={styles.rightWrap}>{right}</View> : null}
    </Appbar.Header>
  );
});

AppBar.displayName = 'AppBar';

const styles = StyleSheet.create({
  titleWrap: {
    marginLeft: Const.padSize,
  },
  leftSlot: {
    flex: 1,
    minWidth: 0, // allow inner text to ellipsize
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftInner: {
    marginLeft: Const.padSize,
    flex: 1, // lets child opt-in to grow if it uses flex styles
  },
  rightWrap: {
    marginRight: Const.padSize,
  },
});
