import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Menu as PaperMenu, Divider } from 'react-native-paper';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @property label       - human-readable text shown for the row
 * @property value       - opaque value emitted on selection (e.g., route name, action key)
 * @property leadingIcon - Material icon name for the left adornment (e.g., "account", "logout")
 * @property disabled    - when true, the row is non-interactive and dimmed
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

type MenuListProps = {
  options: MenuOption[];
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  showDividers?: boolean;
  dense?: boolean;
};

/******************************************************************************************************************
 * Stateless action menu built with React Native Paper.
 * - Suitable for navigation and quick actions (e.g., profile popup, overflow menus).
 *
 * @param props - menu props:
 *   - options: [] - array of MenuOption rows to display (order preserved)
 *   - onSelect: fn - callback invoked with the clicked option's `value`
 *   - style?: StyleProp<ViewStyle> - wrapper style for the outer container
 *   - showDividers?: bool - when true, draws a Divider between items
 *   - dense?: bool - when true, renders compact rows
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
export const MenuList: React.FC<MenuListProps> = memo(({
  options,
  onSelect,
  style = {},
  showDividers = false,
  dense = false,
}) => {
  return (
    <View style={[{ width: '100%' }, style]}>
      {options.map((item, idx) => (
        <React.Fragment key={`${item.value}-${idx}`}>
          <PaperMenu.Item
            leadingIcon={item.leadingIcon}
            title={item.label}
            onPress={() => !item.disabled && onSelect(item.value)}
            disabled={!!item.disabled}
            dense={dense}
          />
          {showDividers && idx < options.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </View>
  );
});
