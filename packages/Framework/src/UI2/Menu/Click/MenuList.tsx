import React, { memo } from 'react';
import { View } from 'react-native';
import { useTheme, Divider, List } from 'react-native-paper';
import * as Const from '../../../Const';
import { type MenuList } from './MenuList.types';

/******************************************************************************************************************
 * MenuList implementation.
 ******************************************************************************************************************/
export const MenuListComp: MenuList = memo(({
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
        const padding = dense ? 0 : Const.padSize;
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
