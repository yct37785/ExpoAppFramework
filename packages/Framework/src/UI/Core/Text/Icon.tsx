import React, { memo, useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Icon as PaperIcon, useTheme } from 'react-native-paper';
import { IconType, IconVariant } from './Icon.types';
import { tokenToRNPaperThemeKey } from '../../../Types';

/******************************************************************************************************************
 * Variant → pixel size mapping
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
export const Icon: IconType = memo(({ source, variant = 'md', size, color = 'default', style }) => {
  const theme = useTheme();

  // resolve numeric size (explicit size overrides variant)
  const pixel = size ?? sizeMap[variant];

  // resolve theme color
  const themeKey = tokenToRNPaperThemeKey[color];
  const resolvedColor =
    (theme.colors as any)[themeKey] ?? theme.colors.onSurface;

  const base: ViewStyle = { justifyContent: 'center', alignItems: 'center' };
  const wrapperStyle = useMemo<StyleProp<ViewStyle>>(
    () => StyleSheet.compose(base, style),
    [style]
  );

  return (
    <View style={wrapperStyle}>
      <PaperIcon source={source} size={pixel} color={resolvedColor} />
    </View>
  );
});

Icon.displayName = 'Icon';
