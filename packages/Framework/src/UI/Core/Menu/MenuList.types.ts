import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @property label       - Human-readable text shown for the row
 * @property value       - Opaque value emitted on selection (e.g., route name, action key)
 * @property leadingIcon - Material icon name for the left adornment (e.g., 'account', 'logout')
 * @property disabled    - When true, the row is non-interactive and dimmed
 *
 * @usage
 * ```ts
 * const items: MenuOption[] = [
 *   { label: 'Profile', value: 'profile', leadingIcon: 'account' },
 *   { label: 'Settings', value: 'settings', leadingIcon: 'cog' },
 *   { label: 'Sign out', value: 'logout', leadingIcon: 'logout' },
 * ];
 * ```
 ******************************************************************************************************************/
export type MenuOption = {
  label: string;
  value: string;
  leadingIcon?: string;
  disabled?: boolean;
};

/******************************************************************************************************************
 * MenuList props.
 * 
 * @property options        - Array of MenuOption rows to display (order preserved)
 * @property onSelect       - Callback invoked with the clicked option's `value`
 * @property showDividers?  - When true, draws a Divider between items
 * @property dense?         - When true, renders compact rows
 * @property style?         - Wrapper style for the outer container
 ******************************************************************************************************************/
export type MenuListProps = {
  options: MenuOption[];
  onSelect: (value: string) => void;
  showDividers?: boolean;
  dense?: boolean;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A structured list of selectable menu items, often used within dropdowns or popups.
 *
 * @usage
 * ```tsx
 * <MenuList
 *   options={[
 *     { label: 'Redo', value: 'redo', leadingIcon: 'redo' },
 *     { label: 'Undo', value: 'undo', leadingIcon: 'undo' },
 *     { label: 'Cut',  value: 'cut',  leadingIcon: 'content-cut', disabled: true },
 *     { label: 'Copy', value: 'copy', leadingIcon: 'content-copy' },
 *     { label: 'Paste',value: 'paste',leadingIcon: 'content-paste' },
 *   ]}
 *   onSelect={(v) => console.log('selected', v)}
 *   showDividers
 *   dense
 * />
 * ```
 ******************************************************************************************************************/
export type MenuListType = React.FC<MenuListProps>;
