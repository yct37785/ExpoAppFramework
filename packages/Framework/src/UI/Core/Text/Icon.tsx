import React, { memo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Icon as PaperIcon, useTheme } from 'react-native-paper';
import { IconType, IconVariant } from './Icon.types';
import { resolveFontColor } from './Utils';

/******************************************************************************************************************
 * Variant: pixel size mapping
 ******************************************************************************************************************/
const sizeMap: Record<IconVariant, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 40,
};

/******************************************************************************************************************
 * Icon implementation.
 ******************************************************************************************************************/
export const Icon: IconType = memo(
  ({ source, variant = 'md', color = 'default', customColor, size, style }) => {
    const theme = useTheme();
    const resolvedColor = resolveFontColor(color, customColor, theme);

    // resolve numeric size (explicit size overrides variant)
    const pixel = size ?? sizeMap[variant];

    const wrapperStyle: StyleProp<ViewStyle> = [styles.wrapper, style];

    return (
      <View style={wrapperStyle}>
        <PaperIcon source={source} size={pixel} color={resolvedColor} />
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});