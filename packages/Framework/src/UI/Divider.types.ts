import React from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';

/******************************************************************************************************************
 * Divider props.
 *
 * @property orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @property color?       - Custom color; defaults to theme.colors.outlineVariant (MD3 divider color)
 * @property spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers. Default: Const.padSize
 * @property style?       - Additional style for the divider
 ******************************************************************************************************************/
export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
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
 * @usage
 * ```tsx
 * <Divider spacing={8} />
 * <Divider orientation="vertical" thickness={2} style={{ height: 24 }} />
 * ```
 ******************************************************************************************************************/
export type DividerType = React.FC<DividerProps>;
