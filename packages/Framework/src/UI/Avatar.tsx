import React, { memo, useMemo } from 'react';
import { Image, View, StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextVariant } from './Text/Text.types';
import { Text } from './Text/Text';
import { AvatarType } from './Avatar.types';

/******************************************************************************************************************
 * Avatar implementation.
 ******************************************************************************************************************/
export const Avatar: AvatarType = memo(
  ({ uri, label, size = 'md', shape = 'circle', style, imageStyle, badgeColor }) => {
    const theme = useTheme();

    const px = useMemo(() => {
      if (typeof size === 'number') return size;
      return size === 'sm' ? 28 : size === 'lg' ? 48 : 36; // md default
    }, [size]);

    const radius = shape === 'circle' ? px / 2 : Math.max(6, Math.round(px * 0.22));

    const container: ViewStyle = {
      width: px,
      height: px,
      borderRadius: radius,
      backgroundColor: theme.colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    };

    const textVariant: TextVariant = px >= 44 ? 'bodySmall' : px >= 36 ? 'labelMedium' : 'labelSmall';

    return (
      <View style={[container, style]}>
        {uri ? (
          <Image source={{ uri }} style={[StyleSheet.absoluteFillObject, { borderRadius: radius }, imageStyle]} />
        ) : (
          !!label && <Text variant={textVariant}>{label}</Text>
        )}

        {badgeColor ? (
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: Math.max(8, Math.round(px * 0.25)),
              height: Math.max(8, Math.round(px * 0.25)),
              borderRadius: 99,
              backgroundColor: badgeColor,
              borderWidth: 2,
              borderColor: theme.colors.surface,
            }}
          />
        ) : null}
      </View>
    );
  }
);
