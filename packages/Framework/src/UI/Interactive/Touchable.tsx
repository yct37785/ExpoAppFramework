import React, { forwardRef, memo } from 'react';
import { Pressable,
  type PressableProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

/******************************************************************************************************************
 * Touchable props.
 *
 * @property feedback       - Press feedback style ('opacity' | 'none'), default: 'opacity'
 * @property pressedOpacity - Opacity when pressed (only for 'opacity'), default: 0.6
 * @property style          - Style(s) applied to the Pressable root
 * @property ...rest        - All standard React Native Pressable props
 ******************************************************************************************************************/
export type TouchableProps = Omit<PressableProps, 'style'> & {
  feedback?: 'opacity' | 'none';
  pressedOpacity?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Touchable: Minimal wrapper over Pressable with a cross-platform opacity feedback.
 *
 * @param props - Refer to TouchableProps
 * 
 * @usage
 * ```tsx
 * <Touchable onPress={onPress} style={{ padding: 12 }}>
 *   <Text variant="label">Tap me</Text>
 * </Touchable>
 * ```
 ******************************************************************************************************************/
const TouchableBase = forwardRef<any, TouchableProps>(function Touchable(
  { feedback = 'opacity', pressedOpacity = 0.6, style, disabled, ...rest },
  ref
) {
  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      style={({ pressed }) => [
        style as any,
        feedback === 'opacity' && pressed && !disabled ? { opacity: pressedOpacity } : null,
      ]}
      {...rest}
    />
  );
});

export const Touchable = memo(TouchableBase);
Touchable.displayName = 'Touchable';
