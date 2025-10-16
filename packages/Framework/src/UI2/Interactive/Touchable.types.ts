import React from 'react';
import { type PressableProps, type ViewStyle, type StyleProp } from 'react-native';

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
 * @usage
 * ```tsx
 * <Touchable onPress={handlePress} style={{ padding: 12, borderRadius: 8 }}>
 *   <Text>Tap me</Text>
 * </Touchable>
 * ```
 ******************************************************************************************************************/
export type Touchable = React.FC<TouchableProps>;
