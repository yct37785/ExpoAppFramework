import React from 'react';
import { type PressableProps, type ViewStyle, type StyleProp } from 'react-native';

/******************************************************************************************************************
 * TouchableProps
 *
 * @property feedback              - Press feedback style ('opacity' | 'none'). Default: 'opacity'
 *                                   • 'opacity': Smooth opacity animation + Android ripple
 *                                   • 'none'   : No visual feedback
 * @property pressOpacity          - Press opacity, defaults to pressOpacityLight
 * @property disabled              - Disables press handling & visual feedback
 * @property onPress               - Called when the press gesture ends successfully
 * @property onPressIn             - Called when the press gesture starts
 * @property onPressOut            - Called when the press gesture ends (canceled or completed)
 * @property onLongPress           - Called when the user presses and holds for longer than the delay
 * @property delayLongPress        - Time (ms) before onLongPress fires
 * @property android_disableSound  - Disables Android's click sound
 * @property hitSlop               - Extra touch area around the element
 * @property pressRetentionOffset  - Defines how far the touch can move before deactivating press
 * @property style                 - Style(s) applied to the root container
 * @property children              - React children rendered inside the touchable
 ******************************************************************************************************************/
export interface TouchableProps {
  feedback?: 'opacity' | 'none';
  pressOpacity?: number;
  disabled?: boolean;
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  onLongPress?: PressableProps['onLongPress'];
  delayLongPress?: number;
  android_disableSound?: boolean;
  hitSlop?: PressableProps['hitSlop'];
  pressRetentionOffset?: PressableProps['pressRetentionOffset'];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/******************************************************************************************************************
 * A generic interactive wrapper providing consistent feedback (ripple or opacity) for pressable elements.
 *
 * @usage
 * ```tsx
 * <Touchable onPress={handlePress} style={{ padding: 12, borderRadius: 8 }}>
 *   <Text>Tap me</Text>
 * </Touchable>
 * ```
 ******************************************************************************************************************/
export type TouchableType = React.FC<TouchableProps>;
