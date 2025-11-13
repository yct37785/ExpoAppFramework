import React, { memo } from 'react';
import { View, StyleSheet, StyleSheet as RNStyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { Divider as PaperDivider } from 'react-native-paper';
import * as Const from '../../../Const';
import { DividerType } from './Divider.types';

/******************************************************************************************************************
 * Divider implementation.
 ******************************************************************************************************************/
export const Divider: DividerType = memo(
  ({
    orientation = 'horizontal',
    spacing = 1,
    margin = 0,
    style,
  }) => {

    if (orientation === 'vertical') {
      const vStyle: ViewStyle = {
        width: RNStyleSheet.hairlineWidth,
        height: '100%',
        marginHorizontal: spacing * Const.padSize,
        marginVertical: margin * Const.padSize,
        alignSelf: 'stretch',
      };
      return <View style={[styles.base, vStyle, style]} />;
    }

    const hStyle: ViewStyle = {
      height: RNStyleSheet.hairlineWidth,
      marginVertical: spacing * Const.padSize,
      marginHorizontal: margin * Const.padSize,
    };

    return <PaperDivider style={[styles.base, hStyle, style]} />;
  }
);

const styles = StyleSheet.create({
  base: { alignSelf: 'stretch' },
});
