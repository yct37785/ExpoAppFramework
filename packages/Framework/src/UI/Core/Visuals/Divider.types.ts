import React from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';

/******************************************************************************************************************
 * Divider props.
 *
 * @property orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @property spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers. Default: Const.padSize
 * @property style?       - Additional style for the divider
 ******************************************************************************************************************/
export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A thin visual separator used to group or divide related UI content.
 * 
 * @usage
 * ```tsx
 * <Divider spacing={8} />
 * <Divider orientation="vertical" thickness={2} style={{ height: 24 }} />
 * ```
 ******************************************************************************************************************/
export type DividerType = React.FC<DividerProps>;
