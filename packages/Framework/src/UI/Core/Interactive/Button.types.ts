import type React from 'react';
import type {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';

/******************************************************************************************************************
 * Button mode.
 *
 * @property text             - flat button without background or outline, used for the lowest priority actions, 
 *                              especially when presenting multiple options.
 * 
 * @property outlined         - button with an outline without background, typically used for important, 
 *                              but not primary action – represents medium emphasis.
 * 
 * @property contained        - button with a background color, used for important action, 
 *                              have the most visual impact and high emphasis.
 * 
 * @property elevated         - button with a background color and elevation, used when absolutely necessary 
 *                              e.g. button requires visual separation from a patterned background.
 * 
 * @property contained-tonal  - button with a secondary background color, 
 *                              an alternative middle ground between contained and outlined buttons.
 ******************************************************************************************************************/
export type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

/******************************************************************************************************************
 * Button props.
 * 
 * TODO: icon
 *
 * @property mode?             - Visual style variant (MD3)
 * @property compact?          - Slightly reduce paddings/min-height for dense layouts
 * 
 * @property disabled?         - Disable interactions and apply disabled styles
 * @property loading?          - Show a small busy indicator and reduce label opacity
 * 
 * @property buttonColor?      - Background color override (enabled state)
 * @property textColor?        - Label color override (enabled state)
 * @property rippleColor?      - Optional ripple color override (platform dependent)
 * 
 * @property contentStyle?     - Style for inner content container (e.g., height, padding, direction)
 * @property labelStyle?       - Style for the button text
 * @property style?            - Style for the outer button container (background/border)
 * @property accessibilityLabel?  - A11y label read by screen readers
 * 
 * @property onPress?          - Press handler
 * @property onPressIn?        - Called on pointer/touch in
 * @property onPressOut?       - Called on pointer/touch out
 * @property onLongPress?      - Long-press handler
 * @property delayLongPress?   - Milliseconds before long-press fires
 * 
 * @property children          - Button label (text) or a custom node
 ******************************************************************************************************************/
export type ButtonProps = {
  mode?: ButtonMode;
  compact?: boolean;
  
  disabled?: boolean;
  loading?: boolean;

  buttonColor?: string;
  textColor?: string;
  rippleColor?: ColorValue;

  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;

  onPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  delayLongPress?: number;

  children?: React.ReactNode;
};

/******************************************************************************************************************
 * A pressable control that triggers an action or event, supporting multiple visual modes.
 * 
 * @usage
 * ```tsx
 * <Button mode="text" onPress={handlePress}>Text</Button>
 * <Button mode="outlined" icon="cog" onPress={openSettings}>Settings</Button>
 * <Button mode="contained" loading>Saving…</Button>
 * <Button mode="contained-tonal" buttonColor="#6750A4">Tonal</Button>
 * <Button mode="elevated" disabled>Disabled</Button>
 * <Button mode="contained" compact contentStyle={{ minHeight: 36 }}>Compact</Button>
 * <Button mode="text" labelStyle={{ textTransform: 'none' }}>No Caps</Button>
 * ```
 ******************************************************************************************************************/
export type ButtonType = React.FC<ButtonProps>;
