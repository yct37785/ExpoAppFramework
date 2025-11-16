import React, { memo } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import * as Const from '../../../Const';
import { Text } from '../Text/Text';
import { Icon } from '../Text/Icon';
import { Touchable } from '../Interactive/Touchable';
import { MenuListItemType } from './MenuListItem.types';

/******************************************************************************************************************
 * MenuListItem implementation.
 ******************************************************************************************************************/
export const MenuListItem: MenuListItemType = memo(
  ({ option, onPress, dense = false, style }) => {
    const paddingX = dense ? Const.padSize025 : Const.padSize;
    const paddingY = dense ? Const.padSize : Const.padSize2;
    const disabled = !!option.disabled;

    const handlePress = () => {
      if (!disabled) {
        onPress(option.value);
      }
    };

    // padding
    const dynamicPadding: ViewStyle = {
      paddingHorizontal: paddingX,
      paddingVertical: paddingY,
    };

    const wrapperStyle: StyleProp<ViewStyle> = [
      styles.baseRow,
      dynamicPadding,
      style,
    ];

    const iconMarginStyle = dense
      ? styles.iconMarginDense
      : styles.iconMarginRegular;

    // extract icon style override, if any, so we can merge margins + custom styles
    const iconStyleOverride = option.iconOpts?.style;
    const { style: _ignoredIconStyle, ...restIconOpts } = option.iconOpts ?? {};

    const iconSource = option.icon;
    const text = option.text ?? '';

    return (
      <Touchable
        pressOpacity={Const.pressOpacityHeavy}
        onPress={handlePress}
        disabled={disabled}
        style={wrapperStyle}
      >
        <>
          {/* leading icon */}
          {iconSource ? (
            <Icon
              source={iconSource}
              variant={dense ? 'sm' : 'md'}
              color={disabled ? 'disabled' : 'default'}
              style={[iconMarginStyle, iconStyleOverride]}
              {...restIconOpts}
            />
          ) : null}

          {/* label / text */}
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
  baseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red', // debug
  },
  iconMarginDense: {
    marginRight: Const.padSize,
  },
  iconMarginRegular: {
    marginRight: Const.padSize2,
  },
});
