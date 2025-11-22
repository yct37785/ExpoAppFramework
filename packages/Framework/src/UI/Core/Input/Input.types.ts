import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/******************************************************************************************************************
 * Supported input modes.
 ******************************************************************************************************************/
export type InputKind =
  | 'text'
  | 'numeric'
  | 'passcode'
  | 'search'
  | 'email'
  | 'phone';

/******************************************************************************************************************
 * TextInput props.
 *
 * @property type?         - Input mode to render ('text', 'numeric', 'passcode', 'search', 'email', 'phone')
 * @property value?        - Current input value
 * @property placeholder?  - Placeholder text
 * @property onChange?     - Called when value changes
 * @property onFocus?      - Called when input gains focus
 * @property onBlur?       - Called when input loses focus
 * @property style?        - Optional custom styling (ViewStyle or TextStyle)
 * @property autoFocus?    - Auto focus on mount
 * @property maxLength?    - Max character length allowed
 * @property multiline?    - Whether text input is multiline
 * @property numberOfLines?- Number of lines when multiline is enabled
 * @property editable?     - Whether the input can be edited
 ******************************************************************************************************************/
export type TextInputProps = {
  type?: InputKind;
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
  autoFocus?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
};

/******************************************************************************************************************
 * A controlled text field for user input.
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
export type TextInputType = React.FC<TextInputProps>;
