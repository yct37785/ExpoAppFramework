import React, { memo, useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import * as Const from '../../../Const';
import { Text } from '../Text/Text';
import { Icon } from '../Text/Icon';
import { Touchable } from '../Interactive/Touchable';
import { MenuListItemType } from './MenuListItem.types';

/******************************************************************************************************************
 * MenuListItem implementation.
 ******************************************************************************************************************/
export const MenuListItem: MenuListItemType = memo(({ option, onPress, dense = false, style = {} }) => {
  const padding = dense ? Const.padSize025 : Const.padSize;
  const disabled = !!option.disabled;

  const handlePress = () => {
    if (!disabled) onPress(option.value);
  };

  const base: ViewStyle = { flexDirection: 'row', alignItems: 'center', padding };
  const wrapperStyle = useMemo<StyleProp<ViewStyle>>(
    () => StyleSheet.compose(base, style),
    [style]
  );

  return (
    <Touchable
      pressOpacity={Const.pressOpacityHeavy}
      onPress={handlePress}
      disabled={disabled}
      style={wrapperStyle}
    >
      <>
        {/* leading icon */}
        {option.leadingIcon ? (
          <Icon
            source={option.leadingIcon}
            variant={dense ? 'sm' : 'md'}
            color={disabled ? 'disabled' : 'default'}
            style={{ marginRight: dense ? Const.padSize : Const.padSize2 }}
          />
        ) : null}

        {/* label */}
        <Text color={disabled ? 'disabled' : 'default'} variant={dense ? 'labelSmall' : 'labelMedium'}>{option.label}</Text>
      </>
    </Touchable>
  );
});
