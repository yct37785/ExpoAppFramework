import React, { memo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../Text/Text';
import { Touchable } from '../Interactive/Touchable';
import * as Const from '../../Const';
import { AppBarType } from './AppBar.types';

/******************************************************************************************************************
 * AppBar implementation
 ******************************************************************************************************************/
export const AppBar: AppBarType = memo(
  ({ title, TitleComponent, onBack, left, right, elevated = false, style }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const topPad = insets.top; // iOS notch / Android status bar height

    const container: ViewStyle = {
      height: 56 + topPad,
      paddingTop: topPad,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderBottomWidth: elevated ? 0 : StyleSheet.hairlineWidth,
      borderBottomColor: elevated ? 'transparent' : theme.colors.outline,
      // very light shadow for iOS; Android will ignore unless you add elevation
      shadowColor: elevated ? '#000' : 'transparent',
      shadowOpacity: elevated ? 0.06 : 0,
      shadowRadius: elevated ? 4 : 0,
      shadowOffset: elevated ? { width: 0, height: 2 } : { width: 0, height: 0 },
      elevation: elevated ? 2 : 0,
    };

    return (
      <View style={[container, style]}>
        {/* Back / Left */}
        <View style={{ paddingHorizontal: Const.padSize }}>
          {onBack ? (
            <Touchable
              onPress={onBack}
              style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text variant='bodyMedium'>{'‹'}</Text>
            </Touchable>
          ) : left ? (
            left
          ) : null}
        </View>

        {/* Title */}
        <View style={{ flex: 1, minWidth: 0 }}>
          {TitleComponent ? (
            <TitleComponent />
          ) : !!title ? (
            <Text variant='bodySmall' numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>

        {/* Right */}
        <View style={{ minWidth: 48, paddingLeft: Const.padSize, paddingRight: Const.padSize2, alignItems: 'flex-end' }}>{right}</View>
      </View>
    );
  }
);
