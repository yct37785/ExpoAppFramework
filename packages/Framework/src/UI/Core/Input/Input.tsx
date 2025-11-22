import React, { useEffect, useRef, memo } from 'react';
import { Keyboard, TextStyle, StyleProp } from 'react-native';
import { Searchbar, TextInput as RNPTextInput } from 'react-native-paper';
import { TextInputType, InputKind } from './Input.types';

// maps input type to a suitable keyboardType
const getKeyboardTypeForType = (type: InputKind): React.ComponentProps<typeof RNPTextInput>['keyboardType'] => {
  switch (type) {
    case 'numeric':
    case 'passcode':
      return 'number-pad';
    case 'email':
      return 'email-address';
    case 'phone':
      return 'phone-pad';
    default:
      return 'default';
  }
};

// determines if the input should hide characters (e.g. passcode)
const isSecureForType = (type: InputKind): boolean => {
  return type === 'passcode';
};

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
    autoFocus,
    maxLength,
    multiline,
    numberOfLines,
    editable = true,
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

    // search input uses the dedicated Searchbar component
    if (type === 'search') {
      return (
        <Searchbar
          ref={inputRef}
          placeholder={placeholder}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          autoFocus={autoFocus}
          style={style as StyleProp<TextStyle>}
        />
      );
    }

    // all other types use the standard TextInput with type-aware config
    const keyboardType = getKeyboardTypeForType(type);
    const secureTextEntry = isSecureForType(type);

    return (
      <RNPTextInput
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        style={style}
      />
    );
  }
);
