import React, { memo } from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { padSize } from '../Const';
import { useTheme } from '../Theme/ThemeProvider';

/******************************************************************************************************************
 * Divider props.
 *
 * @property orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @property thickness?   - Line thickness in dp (defaults to hairline)
 * @property color?       - Custom color; defaults to theme.colors.border
 * @property spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers. Default: 0
 * @property style?       - Additional style for the divider View
 ******************************************************************************************************************/
type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a simple themed divider (horizontal or vertical).
 * Uses the active theme for default color and supports optional spacing.
 *
 * @param props - Refer to DividerProps
 *
 * @usage
 * ```tsx
 * <Divider spacing={8} />
 * <Divider orientation='vertical' thickness={2} style={{ height: 24 }} />
 * ```
 ******************************************************************************************************************/
export const Divider: React.FC<DividerProps> = memo(({
  orientation = 'horizontal',
  thickness = StyleSheet.hairlineWidth,
  color,
  spacing = padSize,
  style,
}) => {
  const t = useTheme();
  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: ViewStyle = {
    backgroundColor: color ?? t.colors.border,
    height: isHorizontal ? thickness : '100%',
    width: isHorizontal ? '100%' : thickness,
    marginVertical: isHorizontal ? spacing : 0,
    marginHorizontal: isHorizontal ? 0 : spacing,
  };

  const composed: StyleProp<ViewStyle> = [styles.base, dividerStyle, style];

  return <View style={composed} />;
});

const styles = StyleSheet.create({
  base: { alignSelf: 'stretch' },
});
