import React, { useEffect, useRef, memo } from 'react';
import { Keyboard, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';

/**
 * KeyInputField props
 * 
 * @param type - 'text', 'numeric', 'passcode', 'search'.
 * @param value - Current value of the input.
 * @param placeholder - Placeholder text for the input.
 * @param onChange - Callback function to receive changed input value.
 * @param onFocus - Callback function to handle focus event on the input.
 * @param onBlur - Callback function to handle blur event on the input.
 * @param style - Additional style on base container.
 */
export interface ITextInputCompProps {
  type?: 'text' | 'numeric' | 'passcode' | 'search';
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
};

/**
 * KeyInputField Component
 */
const TextInputComp: React.FC<ITextInputCompProps> = ({
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
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (inputRef.current && 'blur' in inputRef.current) {
        inputRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, []);

  return (
    <>
      {type === "search" && (
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
      {type === "text" && (
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          style={style}
        />
      )}
      {/* Add more conditions here for other types */}
    </>
  );
};

export default memo(TextInputComp);