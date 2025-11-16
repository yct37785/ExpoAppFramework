import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { TextProps } from '../Text/Text.types';
import type { IconProps } from '../Text/Icon.types';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @property value       - Opaque value emitted on selection (e.g. route name, action key)
 * @property text        - Preferred text label
 * @property textOpts    - Optional text props (variant, color, bold, style, …)
 * @property icon        - Optional leading icon
 * @property iconOpts    - Optional icon props (variant, color/customColor, size, style, …)
 * @property disabled    - When true, the row is non-interactive and dimmed
 ******************************************************************************************************************/
export type MenuOption = {
  value: string;
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  disabled?: boolean;
};

/******************************************************************************************************************
 * MenuListItem props.
 *
 * @property option       - The option to render
 * @property onPress      - Invoked with the option's value when pressed (no-op if disabled)
 * @property dense?       - Compact row density
 * @property style?       - Optional container style
 ******************************************************************************************************************/
export type MenuListItemProps = {
  option: MenuOption;
  onPress: (value: string) => void;
  dense?: boolean;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A single interactive row within a menu list.
 *
 * @usage
 * ```tsx
 * <MenuListItem
 *   option={{ text: 'Settings', value: 'settings', icon: 'cog' }}
 *   onPress={(v) => console.log('pressed', v)}
 * />
 * ```
 ******************************************************************************************************************/
export type MenuListItemType = React.FC<MenuListItemProps>;
