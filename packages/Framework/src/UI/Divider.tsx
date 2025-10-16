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
    thickness = RNStyleSheet.hairlineWidth,
    color,
    spacing = Const.padSize,
    style,
  }) => {
    const theme = useTheme();
    const dividerColor = color ?? theme.colors.outlineVariant; // MD3 divider token

    if (orientation === 'vertical') {
      // Vertical divider: match MD3 color and thickness; stretch to container height.
      const vStyle: ViewStyle = {
        backgroundColor: dividerColor,
        width: thickness,
        height: '100%',
        marginHorizontal: spacing,
        alignSelf: 'stretch',
      };
      return <View style={[styles.base, vStyle, style]} />;
    }

    // Horizontal divider (Paper)
    // Apply thickness via height; spacing via vertical margin; color via backgroundColor.
    const hStyle: ViewStyle = {
      backgroundColor: dividerColor,
      height: thickness,
      marginVertical: spacing,
    };

    return <PaperDivider style={[styles.base, hStyle, style]} />;
  }
);

const styles = StyleSheet.create({
  base: { alignSelf: 'stretch' },
});
