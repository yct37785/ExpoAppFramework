import React, { useRef, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Pressable,
  type ViewStyle,
  Platform,
  Animated,
  Easing
} from 'react-native';
import * as Const from '../../../Const';
import { TouchableType } from './Touchable.types';

/******************************************************************************************************************
 * Touchable implementation.
 ******************************************************************************************************************/
export const Touchable: TouchableType = memo(
  ({
    feedback = 'opacity',
    pressOpacity = Const.pressOpacityLight,
    style,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    android_disableSound,
    hitSlop,
    pressRetentionOffset,
    children
  }) => {
    /**
     * State: Animated driver for opacity.
     * Using a single Animated.Value avoids re-renders,
     * the value updates on the native thread (useNativeDriver: true).
     */
    const opacity = useRef(new Animated.Value(1)).current;
    const isOpacity = feedback === 'opacity';


    /**
     * Stops any in-flight animation before starting the next one.
     * Using timing with native driver keeps it smooth & low-overhead.
     */
    const run = useCallback(
      (to: number, dur: number) => {
        opacity.stopAnimation(); // stop ongoing animation
        Animated.timing(opacity, {
          toValue: to,
          duration: dur,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();
      },
      [opacity]
    );


    /**
     * Handlers: memoized to avoid re-creation.
     * We only animate when feedback mode is 'opacity' and not disabled.
     */
    const handleIn = useCallback(
      (e: any) => {
        if (!disabled && isOpacity) run(pressOpacity, Const.pressInDurationMS);
        onPressIn?.(e);
      },
      [disabled, isOpacity, onPressIn, run]
    );

    const handleOut = useCallback(
      (e: any) => {
        if (isOpacity) run(1, Const.pressOutDurationMS);
        onPressOut?.(e);
      },
      [isOpacity, onPressOut, run]
    );

    /**
     * Reset opacity immediately when disabled or feedback mode changes.
     */
    useEffect(() => {
      if (!isOpacity || disabled) {
        opacity.stopAnimation();
        opacity.setValue(1);
      }
    }, [isOpacity, disabled, opacity]);

    /**
     * Android native ripple
     * - Used only when feedback = 'opacity' to match Material touch feedback
     */
    const ripple = useMemo(
      () =>
        Platform.OS === 'android' && isOpacity
          ? ({ borderless: false, foreground: true } as const) // draw ripple ABOVE content
          : undefined,
      [isOpacity]
    );

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
        <Animated.View style={[style as ViewStyle, { opacity }]}>{children}</Animated.View>
      </Pressable>
    );
  }
);
