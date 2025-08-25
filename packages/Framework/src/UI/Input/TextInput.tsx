import React, { useEffect, useRef, memo } from 'react';
import { Keyboard, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Searchbar, TextInput as RNPTextInput } from 'react-native-paper';

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
 * Text input
 *
 * A unified text input component built on top of react-native-paper.
 * Automatically blurs when the keyboard is dismissed.
 *
 * Features:
 * - Configurable input types ('text', 'search', etc.)
 * - Standardized theming
 * - Reusable wrapper for common keyboard interactions
 *
 * @param type - input type ('text' | 'numeric' | 'passcode' | 'search')
 * @param value - current input value
 * @param placeholder - placeholder text
 * @param onChange - callback triggered when input value changes
 * @param onFocus - callback triggered when input gains focus
 * @param onBlur - callback triggered when input loses focus
 * @param style - optional custom styling applied
 *
 * @returns JSX.Element
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
