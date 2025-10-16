import React, { memo } from 'react';
import { View, StyleSheet, StyleSheet as RNStyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { Divider as PaperDivider, useTheme } from 'react-native-paper';
import * as Const from '../Const';

/******************************************************************************************************************
 * Divider props.
 *
 * @property orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @property thickness?   - Line thickness in dp (defaults to hairline)
 * @property color?       - Custom color; defaults to theme.colors.outlineVariant (MD3 divider color)
 * @property spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers. Default: Const.padSize
 * @property style?       - Additional style for the divider
 ******************************************************************************************************************/
type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Divider (RN Paper)
 *
 * - Horizontal: uses React Native Paper's <Divider /> and applies thickness, color, spacing via style.
 * - Vertical  : emulates a divider with a themed View (MD3 color + thickness + spacing), full height of container.
 *
 * @param props - Refer to DividerProps
 *
 * @usage
 * ```tsx
 * <Divider spacing={8} />
 * <Divider orientation="vertical" thickness={2} style={{ height: 24 }} />
 * ```
 ******************************************************************************************************************/
export const Divider: React.FC<DividerProps> = memo(
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
