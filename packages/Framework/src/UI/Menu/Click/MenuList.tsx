import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Menu as PaperMenu, useTheme, Divider, List } from 'react-native-paper';
import { iconSizeSmall, iconSizeMedium, padSize, padSize05 } from '../../../Const';

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
 * @param props - Menu props:
 *   - options: []          - Array of MenuOption rows to display (order preserved)
 *   - onSelect: fn         - Callback invoked with the clicked option's `value`
 *   - style?: StyleProp    - Wrapper style for the outer container
 *   - showDividers?: bool  - When true, draws a Divider between items
 *   - dense?: bool         - When true, renders compact rows
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
  const theme = useTheme();
  return (
    <View style={style}>
      {options.map((item, idx) => {
        // values
        const color = item.disabled ? theme.colors.onSurfaceDisabled : theme.colors.onSurface;
        const padding = dense ? 0 : padSize;
        const fontSize = dense ? theme.fonts.bodySmall.fontSize : theme.fonts.bodyLarge.fontSize;

        // left render
        const left = (props: any) => {
          if (!item.leadingIcon) {
            return null;
          }
          if (!dense) {
            return <List.Icon {...props} icon={item.leadingIcon} color={color} />;
          } else {
            return <List.Icon {...props} icon={item.leadingIcon} color={color} style={{ padding }} />;
          }
        };

        return <React.Fragment key={`${item.value}-${idx}`}>
          <List.Item
            title={item.label}
            onPress={() => !item.disabled && onSelect(item.value)}
            left={left}
            disabled={!!item.disabled}
            titleStyle={{ color, fontSize }}
            style={{ paddingVertical: padding }}
          />
          {showDividers && idx < options.length - 1 ? <Divider /> : null}
        </React.Fragment>
      })}
    </View>
  );
});
