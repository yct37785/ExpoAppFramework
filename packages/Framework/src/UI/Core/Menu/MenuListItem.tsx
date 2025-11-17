import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import * as Const from '../../../Const';
import { Text } from '../Text/Text';
import { Icon } from '../Text/Icon';
import { Touchable } from '../Interactive/Touchable';
import { MenuListItemType } from './MenuListItem.types';

/******************************************************************************************************************
 * MenuListItem implementation.
 ******************************************************************************************************************/
export const MenuListItem: MenuListItemType = memo(
  ({ option, onPress, dense = false, align = 'start' }) => {
    const paddingX = dense ? Const.padSize025 : Const.padSize;
    const paddingY = dense ? Const.padSize : Const.padSize2;
    const disabled = !!option.disabled;

    const wrapperStyle: ViewStyle = {
      paddingHorizontal: paddingX,
      paddingVertical: paddingY,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
    };

    const iconMargin = dense
      ? styles.iconMarginDense
      : styles.iconMarginRegular;

    const iconOverride = option.iconOpts?.style;
    const { style: _remove, ...restIconOpts } = option.iconOpts ?? {};

    const text = option.text ?? '';

    return (
      <Touchable
        pressOpacity={Const.pressOpacityHeavy}
        onPress={() => !disabled && onPress(option.value)}
        disabled={disabled}
        style={wrapperStyle}
      >
        <>
          {option.icon ? (
            <Icon
              source={option.icon}
              variant={dense ? 'sm' : 'md'}
              color={disabled ? 'disabled' : 'default'}
              style={[
                align === 'center' ? styles.iconCenteredMargin : iconMargin,
                iconOverride,
              ]}
              {...restIconOpts}
            />
          ) : null}

          {text ? (
            <Text
              variant={dense ? 'labelSmall' : 'labelMedium'}
              color={disabled ? 'disabled' : 'default'}
              {...option.textOpts}
            >
              {text}
            </Text>
          ) : null}
        </>
      </Touchable>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  iconMarginDense: {
    marginRight: Const.padSize,
  },
  iconMarginRegular: {
    marginRight: Const.padSize2,
  },
  // smaller, balanced spacing for centered layout
  iconCenteredMargin: {
    marginRight: Const.padSize,
  },
});
