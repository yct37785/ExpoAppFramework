import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

/******************************************************************************************************************
 * Supported input modes.
 ******************************************************************************************************************/
export type InputKind =
  | 'text'
  | 'numeric'
  | 'password'
  | 'search'
  | 'email'
  | 'phone';

/******************************************************************************************************************
 * Supported input visual variants.
 ******************************************************************************************************************/
export type InputVariant = 'flat' | 'outline';

/******************************************************************************************************************
 * TextInput props.
 *
 * @property type?                 - Input mode ('text', 'numeric', 'password', 'search', 'email', 'phone')
 * @property label?                - Optional text label displayed above the input
 * @property variant?              - Visual style ('flat' | 'outline')
 * @property value?                - Current input value
 * @property placeholder?          - Placeholder text
 * @property onChange?             - Called when value changes
 * @property onFocus?              - Called when input gains focus
 * @property onBlur?               - Called when input loses focus
 * @property style?                - Optional custom styling (ViewStyle or TextStyle)
 * @property autoFocus?            - Auto focus on mount
 * @property maxLength?            - Character limit
 * @property multiline?            - Whether the field allows multiple lines
 * @property numberOfLines?        - Number of lines when multiline is enabled
 * @property editable?             - Whether user can modify input
 * @property leadingIcon?          - Optional left icon (e.g. 'magnify' for search)
 * @property trailingIcon?         - Optional right icon (overrides default clear/password toggle)
 * @property onPressTrailingIcon?  - Custom handler when trailing icon is pressed
 ******************************************************************************************************************/
export type TextInputProps = {
  type?: InputKind;
  label?: string;
  variant?: InputVariant;
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
  leadingIcon?: string;
  trailingIcon?: string;
  onPressTrailingIcon?: () => void;
};

/******************************************************************************************************************
 * A controlled text field for user input.
 *
 * @usage
 * ```tsx
 * <TextInput
 *   type='search'
 *   label='Search'
 *   variant='outline'
 *   leadingIcon='magnify'
 *   value={query}
 *   placeholder='Search items'
 *   onChange={setQuery}
 * />
 * ```
 ******************************************************************************************************************/
export type TextInputType = React.FC<TextInputProps>;
