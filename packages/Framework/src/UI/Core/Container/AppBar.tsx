import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Text } from '../Text/Text';
import { AppBarType } from './AppBar.types';
import * as Const from '../../../Const';

/******************************************************************************************************************
 * AppBar implementation.
 ******************************************************************************************************************/
export const AppBar: AppBarType = memo(({ title, onBack, left, right }) => {
  const theme = useTheme();

  return (
    <Appbar.Header elevated>
      {/* back btn */}
      {onBack ? (
        <Appbar.BackAction onPress={onBack} color={theme.colors.onSurface} />
      ) : null}

      {/* title */}
      {title ? (
        <View style={{ paddingLeft: onBack ? 0 : Const.padSize2 }}>
          <Text variant="titleLarge">{title}</Text>
        </View>
      ) : null}

      {/* left slot (fills remaining width) */}
      <View style={styles.leftSlot}>
        {left ? <View style={styles.leftInner}>{left}</View> : null}
      </View>

      {/* right slot */}
      <View style={styles.rightSlot}>
        {right ? <View style={styles.rightInner}>{right}</View> : null}
      </View>
    </Appbar.Header>
  );
});

AppBar.displayName = 'AppBar';

const styles = StyleSheet.create({
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
  rightSlot: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightInner: {
    marginRight: Const.padSize,
  }
});
