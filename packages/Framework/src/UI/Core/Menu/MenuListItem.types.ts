import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @property label       - Human-readable text shown for the row
 * @property value       - Opaque value emitted on selection (e.g. route name, action key)
 * @property leadingIcon - Material icon name for the left adornment (e.g. 'account', 'logout')
 * @property disabled    - When true, the row is non-interactive and dimmed
 *
 * @usage
 * ```ts
 * const opt: MenuOption = { label: 'Profile', value: 'profile', leadingIcon: 'account' };
 * ```
 ******************************************************************************************************************/
export type MenuOption = {
  label: string;
  value: string;
  leadingIcon?: string;
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
 *   option={{ label: 'Settings', value: 'settings', leadingIcon: 'cog' }}
 *   onPress={(v) => console.log('pressed', v)}
 * />
 * ```
 ******************************************************************************************************************/
export type MenuListItemType = React.FC<MenuListItemProps>;
