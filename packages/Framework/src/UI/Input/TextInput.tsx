import React, { useEffect, useRef, memo } from 'react';
import { Keyboard } from 'react-native';
import { Searchbar, TextInput as RNPTextInput } from 'react-native-paper';
import { TextInputType } from './TextInput.types';

/******************************************************************************************************************
 * TextInput implementation.
 ******************************************************************************************************************/
export const TextInput: TextInputType = memo(({
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
