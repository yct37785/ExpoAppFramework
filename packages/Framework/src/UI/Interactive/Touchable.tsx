import React, { useRef, useEffect, memo } from 'react';
import {
  Pressable,
  type ViewStyle,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import * as Const from '../../../Const';
import { TouchableType } from './Touchable.types';

/******************************************************************************************************************
 * Predefined Android ripple configuration (shared instance).
 ******************************************************************************************************************/
const ANDROID_RIPPLE = {
  borderless: false,
  foreground: true,
} as const;

/******************************************************************************************************************
 * Touchable implementation.
 * 
 * Notes:
 * - Uses Animated.Value for opacity feedback (native driver).
 * - Avoids heavy hooks (no useMemo/useCallback) since work is cheap.
 * - Uses a shared ripple config instead of recreating it per render.
 ******************************************************************************************************************/
export const Touchable: TouchableType = memo(
  ({
    feedback = 'opacity',
    pressOpacity = Const.pressOpacityLight,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    android_disableSound,
    hitSlop,
    pressRetentionOffset,
    style,
    children,
  }) => {
    const opacity = useRef(new Animated.Value(1)).current;
    const isOpacity = feedback === 'opacity';

    const run = (to: number, dur: number) => {
      opacity.stopAnimation();
      Animated.timing(opacity, {
        toValue: to,
        duration: dur,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    };

    const handleIn = (e: any) => {
      if (!disabled && isOpacity) {
        run(pressOpacity, Const.pressInDurationMS);
      }
      onPressIn?.(e);
    };

    const handleOut = (e: any) => {
      if (isOpacity) {
        run(1, Const.pressOutDurationMS);
      }
      onPressOut?.(e);
    };

    /**
     * Reset opacity immediately when disabled or feedback mode changes.
     */
    useEffect(() => {
      if (!isOpacity || disabled) {
        opacity.stopAnimation();
        opacity.setValue(1);
      }
    }, [isOpacity, disabled, opacity]);

    const ripple =
      Platform.OS === 'android' && isOpacity ? ANDROID_RIPPLE : undefined;

    return (
      <Pressable
        disabled={disabled}
        android_ripple={ripple}
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        android_disableSound={android_disableSound}
        hitSlop={hitSlop}
        pressRetentionOffset={pressRetentionOffset}
      >
        <Animated.View style={[style as ViewStyle, { opacity }]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  }
);
