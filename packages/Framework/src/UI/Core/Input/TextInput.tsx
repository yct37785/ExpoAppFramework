import React, { useEffect, useRef, memo } from 'react';
import { Keyboard, TextStyle, StyleProp } from 'react-native';
import { Searchbar, TextInput as RNPTextInput } from 'react-native-paper';
import { TextInputType } from './TextInput.types';

/******************************************************************************************************************
 * TextInput implementation.
 ******************************************************************************************************************/
export const TextInput: TextInputType = memo(
  ({
    type = 'text',
    value = '',
    placeholder = '',
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    style,
  }) => {
    const inputRef = useRef<any>(null);

    useEffect(() => {
      // only blur when keyboard fully hides AND the input is still focused
      const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
        const ref = inputRef.current;
        if (ref && typeof ref.blur === 'function') {
          if (typeof ref.isFocused === 'function') {
            if (ref.isFocused()) {
              ref.blur();
            }
          } else {
            // fallback: blur without focus check if isFocused is not available
            ref.blur();
          }
        }
      });

      return () => {
        keyboardListener.remove();
      };
    }, []);

    if (type === 'search') {
      return (
        <Searchbar
          ref={inputRef}
          placeholder={placeholder}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          style={style as StyleProp<TextStyle>}
        />
      );
    }

    // default: 'text'
    return (
      <RNPTextInput
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        style={style}
      />
    );
  }
);
