import React, { useEffect, useRef, memo } from 'react';
import { Keyboard, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Searchbar, TextInput as RNPTextInput } from 'react-native-paper';

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
type TextInputProps = {
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
export const TextInput: React.FC<TextInputProps> = memo(({
  type = 'text',
  value = '',
  placeholder = '',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  style = {},
}) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    // auto-blur input when keyboard hides
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (inputRef.current && 'blur' in inputRef.current) {
        inputRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, []);

  return (
    <>
      {type === 'search' && (
        <Searchbar
          ref={inputRef}
          placeholder={placeholder}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          style={style}
        />
      )}
      {type === 'text' && (
        <RNPTextInput
          ref={inputRef}
          placeholder={placeholder}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          style={style}
        />
      )}
      {/* TODO: add support for 'numeric' and 'passcode' types */}
    </>
  );
});
