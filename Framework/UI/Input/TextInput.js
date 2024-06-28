/*****************************************************************************************
 * universal text input field (use for text field, password field, searchbar etc)
*****************************************************************************************/
import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';

/**
 * KeyInputField Component
 * 
 * @param {Object} props - Component props.
 * @param {string} props.type - 'text', 'numeric', 'passcode', 'search'.
 * @param {string} props.value - Current value of the input.
 * @param {string} - props.placeholder - Placeholder text for the input.
 * @param {Function} [props.onChange=({string})=>{}] - Callback function to receive changed input value.
 * @param {Function} [props.onFocus=()=>{}] - Callback function to handle focus event on the input.
 * @param {Function} [props.onBlur=()=>{}] - Callback function to handle blur event on the input.
 * @returns {JSX.Element} The TextInputFieldComp component.
 */
export const TextInputFieldComp = ({
  type,
  value,
  placeholder,
  onChange=(s)=>{},
  onFocus=()=>{},
  onBlur=()=>{}
}) => {
  const inputRef = useRef();

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (inputRef.current) {
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
        />
      )}
      {/* Add more conditions here for other types */}
    </>
  );
};
