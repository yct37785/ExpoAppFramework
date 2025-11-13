import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MenuOption } from './MenuListItem.types';

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
 *   ]}
 *   onSelect={(v) => console.log('selected', v)}
 *   showDividers
 *   dense
 * />
 * ```
 ******************************************************************************************************************/
export type MenuListType = React.FC<MenuListProps>;
