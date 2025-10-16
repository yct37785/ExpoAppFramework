import React, { memo } from 'react';
import { View, StyleSheet, StyleSheet as RNStyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { Divider as PaperDivider, useTheme } from 'react-native-paper';
import * as Const from '../Const';
import { DividerType } from './Divider.types';

/******************************************************************************************************************
 * Divider implementation.
 ******************************************************************************************************************/
export const Divider: DividerType = memo(
  ({
    orientation = 'horizontal',
    color,
    spacing = Const.padSize,
    style,
  }) => {
    const theme = useTheme();
    const dividerColor = color ?? theme.colors.outlineVariant;

    if (orientation === 'vertical') {
      const vStyle: ViewStyle = {
        backgroundColor: dividerColor,
        width: RNStyleSheet.hairlineWidth,
        height: '100%',
        marginHorizontal: spacing,
        alignSelf: 'stretch',
      };
      return <View style={[styles.base, vStyle, style]} />;
    }

    const hStyle: ViewStyle = {
      backgroundColor: dividerColor,
      height: RNStyleSheet.hairlineWidth,
      marginVertical: spacing,
    };

    return <PaperDivider style={[styles.base, hStyle, style]} />;
  }
);

const styles = StyleSheet.create({
  base: { alignSelf: 'stretch' },
});
