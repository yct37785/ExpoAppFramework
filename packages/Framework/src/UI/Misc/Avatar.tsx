import React, { memo } from 'react';
import {
  Image,
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextVariant } from '../Text/Text.types';
import { Text } from '../Text/Text';
import { AvatarType } from './Avatar.types';

/******************************************************************************************************************
 * Avatar implementation.
 ******************************************************************************************************************/
export const Avatar: AvatarType = memo(
  ({ uri, label, size = 'md', shape = 'circle', style, imageStyle, badgeColor }) => {
    const theme = useTheme();

    // px: avatar size in pixels
    const px =
      typeof size === 'number'
        ? size
        : size === 'sm'
        ? 28
        : size === 'lg'
        ? 48
        : 36; // md default

    const radius =
      shape === 'circle' ? px / 2 : Math.max(6, Math.round(px * 0.22));

    const containerStyle: ViewStyle = {
      width: px,
      height: px,
      borderRadius: radius,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
    };

    const textVariant: TextVariant =
      px >= 44 ? 'bodySmall' : px >= 36 ? 'labelMedium' : 'labelSmall';

    const badgeSize = Math.max(8, Math.round(px * 0.25));

    return (
      <View style={[styles.containerBase, containerStyle, style]}>
        {uri ? (
          <Image
            source={{ uri }}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: radius },
              imageStyle,
            ]}
          />
        ) : (
          !!label && <Text variant={textVariant}>{label}</Text>
        )}

        {badgeColor ? (
          <View
            style={[
              styles.badgeBase,
              {
                width: badgeSize,
                height: badgeSize,
                backgroundColor: badgeColor,
                borderColor: theme.colors.surface,
              },
            ]}
          />
        ) : null}
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  containerBase: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeBase: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 99,
    borderWidth: 2,
  },
});
