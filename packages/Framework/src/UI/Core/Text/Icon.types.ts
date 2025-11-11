import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { FontColor } from 'Types';

/******************************************************************************************************************
 * IconVariant
 *
 * Prefixed size variants for icons. These map to pixel sizes in Icon.tsx.
 ******************************************************************************************************************/
export type IconVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/******************************************************************************************************************
 * Icon props.
 *
 * @property source          - Icon source (dependent on icon source under the hood)
 * @property variant?        - Prefixed size variant ('xs'|'sm'|'md'|'lg'|'xl'), defaults to 'md'
 * @property color?          - Font color
 * @property size?           - Optional explicit pixel size (overrides variant mapping)
 * @property style?          - Container style for outer wrapper
 ******************************************************************************************************************/
export type IconProps = {
  source: string;
  variant?: IconVariant;
  color?: FontColor;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A theme-aware icon that uses TextColor tokens for color and supports prefixed size variants.
 *
 * The `variant` maps to pixel sizes; if `size` is provided, it takes precedence.
 *
 * @usage
 * ```tsx
 * <Icon source="home" />                          // default md
 * <Icon source="star" variant="lg" color="primary" />
 * <Icon source="bell" size={28} color="label" />
 * ```
 ******************************************************************************************************************/
export type IconType = React.FC<IconProps>;
