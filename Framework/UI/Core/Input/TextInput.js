import React, { useEffect, useRef, memo } from 'react';
import { Keyboard } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';

/**
 * KeyInputField Component
 * 
 * @param {Object} props - Component props.
 * @param {string} [props.type='text'] - 'text', 'numeric', 'passcode', 'search'.
 * @param {string} [props.value=''] - Current value of the input.
 * @param {string} -[props.placeholder=''] - Placeholder text for the input.
 * @param {Function} [props.onChange=({string})=>{}] - Callback function to receive changed input value.
 * @param {Function} [props.onFocus=()=>{}] - Callback function to handle focus event on the input.
 * @param {Function} [props.onBlur=()=>{}] - Callback function to handle blur event on the input.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The TextInputComp component.
 */
const TextInputComp = ({
  type = 'text',
  value = '',
  placeholder = '',
  onChange=(s)=>{},
  onFocus=()=>{},
  onBlur=()=>{},
  style={}
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