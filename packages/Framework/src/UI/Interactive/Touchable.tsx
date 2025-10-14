import React, { forwardRef, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Pressable,
  type PressableProps,
  type ViewStyle,
  type StyleProp,
  Platform,
  Animated,
  Easing
} from 'react-native';
import { useTheme } from '../../Theme/ThemeProvider';

/******************************************************************************************************************
 * TouchableProps
 *
 * @property feedback              - Press feedback style ('opacity' | 'none'). Default: 'opacity'.
 *                                   • 'opacity': Smooth opacity animation + Android ripple.
 *                                   • 'none'   : No visual feedback.
 * @property style                 - Style(s) applied to the root Animated.View.
 * @property disabled              - Disables press handling & visual feedback.
 * @property onPress               - Called when the press gesture ends successfully.
 * @property onPressIn             - Called when the press gesture starts.
 * @property onPressOut            - Called when the press gesture ends (canceled or completed).
 * @property onLongPress           - Called when the user presses and holds for longer than the delay.
 * @property delayLongPress        - Time (ms) before onLongPress fires.
 * @property android_disableSound  - Disables Android's click sound.
 * @property hitSlop               - Extra touch area around the element.
 * @property pressRetentionOffset  - Defines how far the touch can move before deactivating press.
 * @property children              - React children rendered inside the touchable.
 * @property testID                - Used for testing.
 ******************************************************************************************************************/
export interface TouchableProps {
  feedback?: 'opacity' | 'none';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  onLongPress?: PressableProps['onLongPress'];
  delayLongPress?: number;
  android_disableSound?: boolean;
  hitSlop?: PressableProps['hitSlop'];
  pressRetentionOffset?: PressableProps['pressRetentionOffset'];
  children?: React.ReactNode;
  testID?: string;
}

/******************************************************************************************************************
 * A Pressable wrapper that adds:
 *  • Smooth opacity animation for visual feedback.
 *  • Native Android ripple for perfect platform consistency.
 *
 * Performance notes:
 *  • Handlers are memoized (useCallback) to avoid new identities per render.
 *  • Animations are stopped before re-running to prevent race conditions on fast taps.
 *  • Platform ripple color is left to the system for zero-cost theming + parity.
 *
 * @param props - Refer to TouchableProps.
 *
 * @usage
 * ```tsx
 * <Touchable onPress={handlePress} style={{ padding: 12, borderRadius: 8 }}>
 *   <Text>Tap me</Text>
 * </Touchable>
 * ```
 ******************************************************************************************************************/
const TouchableBase = forwardRef<any, TouchableProps>(function Touchable(
  {
    feedback = 'opacity',
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
    children,
    testID,
  },
  ref
) {
  const t = useTheme();

  /**
   * State: Animated driver for opacity.
   * Using a single Animated.Value avoids re-renders,
   * the value updates on the native thread (useNativeDriver: true).
   */
  const opacity = useRef(new Animated.Value(1)).current;
  const isOpacityFeedback = feedback === 'opacity';

  /**
   * Stops any in-flight animation before starting the next one.
   * Using timing with native driver keeps it smooth & low-overhead.
   */
  const runOpacityTo = useCallback(
    (toValue: number, duration: number) => {
      opacity.stopAnimation(); // prevent overlapping animations on rapid taps
      Animated.timing(opacity, {
        toValue,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,  // the value updates on the native thread
      }).start();
    },
    [opacity]
  );

  /**
   * Handlers: memoized to avoid re-creation.
   * We only animate when feedback mode is 'opacity' and not disabled.
   */
  const handlePressIn = useCallback(
    (e: any) => {
      if (!disabled && isOpacityFeedback) {
        runOpacityTo(t.touch.pressOpacity, t.touch.pressInDurationMs);
      }
      onPressIn?.(e);
    },
    [disabled, isOpacityFeedback, onPressIn, runOpacityTo]
  );

  const handlePressOut = useCallback(
    (e: any) => {
      if (isOpacityFeedback) {
        runOpacityTo(1, t.touch.pressOutDurationMs);
      }
      onPressOut?.(e);
    },
    [isOpacityFeedback, onPressOut, runOpacityTo]
  );

  /**
   * Normalize opacity on prop changes or unmount.
   * - If feedback mode changes or we become disabled, ensure we revert to baseline.
   */
  useEffect(() => {
    if (!isOpacityFeedback || disabled) {
      opacity.stopAnimation();
      opacity.setValue(1);
    }
  }, [isOpacityFeedback, disabled, opacity]);

  /**
   * Android ripple:
   * - Omit `color` so the system uses colorControlHighlight (native parity).
   * - Use foreground ripple so it respects borderRadius clipping.
   */
  const androidRipple = useMemo(
    () =>
      Platform.OS === 'android' && isOpacityFeedback
        ? ({ foreground: true, borderless: false } as const)
        : undefined,
    [isOpacityFeedback]
  );

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      android_ripple={androidRipple}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      android_disableSound={android_disableSound}
      hitSlop={hitSlop}
      pressRetentionOffset={pressRetentionOffset}
      testID={testID}
    >
      {/* we animate only this wrapper's opacity; children don't re-render on every frame */}
      <Animated.View style={[style as any, { opacity }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});

export const Touchable = memo(TouchableBase);
Touchable.displayName = 'Touchable';
