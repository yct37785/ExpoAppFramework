import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Text, useTheme, Icon, Divider } from 'react-native-paper';
import * as Const from '../../../Const';
import { Touchable } from '../Interactive/Touchable';
import { MenuListItemType } from './MenuListItem.types';

/******************************************************************************************************************
 * MenuListItem implementation.
 ******************************************************************************************************************/
export const MenuListItem: MenuListItemType = memo(({ option, onPress, dense = false, style = {} }) => {
  const theme = useTheme();

  const { paddingY, fontSize, color, iconColor, disabled } = useMemo(() => {
    const disabled = !!option.disabled;
    const color = disabled ? theme.colors.onSurfaceDisabled : theme.colors.onSurface;
    const iconColor = color;
    const fontSize = (dense ? theme.fonts.bodySmall.fontSize : theme.fonts.bodyLarge.fontSize) as number;
    const paddingY = dense ? 0 : Const.padSize;
    return { paddingY, fontSize, color, iconColor, disabled };
  }, [option.disabled, dense, theme]);

  const handlePress = () => {
    if (!disabled) onPress(option.value);
  };

  return (
    <Touchable
      pressOpacity={Const.pressOpacityHeavy}
      onPress={handlePress}
      disabled={disabled}
    >
      <View style={[{ flexDirection: 'row', alignItems: 'center', paddingVertical: paddingY }, style]}>
        {/* Leading icon (optional) */}
        {option.leadingIcon ? (
          <Icon
            source={option.leadingIcon}
            size={Const.iconSizeMedium}
            color={iconColor}
          />
        ) : null}

        {/* Label */}
        <Text style={{ color, fontSize }}>{option.label}</Text>
      </View>
    </Touchable>
  );
});
