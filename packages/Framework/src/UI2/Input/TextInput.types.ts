import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/******************************************************************************************************************
 * TextInput props.
 * 
 * @property type?        - Input mode to render
 * @property value?       - Current input value
 * @property placeholder? - Placeholder text
 * @property onChange?    - Called when value changes
 * @property onFocus?     - Called when input gains focus
 * @property onBlur?      - Called when input loses focus
 * @property style?       - Optional custom styling
 ******************************************************************************************************************/
export type TextInputProps = {
  type?: 'text' | 'numeric' | 'passcode' | 'search';
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
};

/******************************************************************************************************************
 * Render a unified text input built on react-native-paper that auto-blurs when the keyboard hides.
 *
 * @param props - Refer to TextInputProps.
 *
 * @usage
 * ```tsx
 * <TextInput
 *   type='search'
 *   value={query}
 *   placeholder='search items'
 *   onChange={setQuery}
 * />
 * ```
 ******************************************************************************************************************/
export type TextInput = React.FC<TextInputProps>;
