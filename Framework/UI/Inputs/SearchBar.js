import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import { Searchbar } from 'react-native-paper';

/**
 * SearchBarComp Component
 * 
 * @param {Object} props - Component props.
 * @param {string} props.value - Current value of the search input.
 * @param {Function} props.onChange - Callback function to handle change in search input value.
 * @param {string} [props.placeholder='Search'] - Placeholder text for the search input.
 * @param {Function} [props.onFocus=()=>{}] - Callback function to handle focus event on the search input.
 * @param {Function} [props.onBlur=()=>{}] - Callback function to handle blur event on the search input.
 * @returns {JSX.Element} The SearchBarComp component.
 */
export const SearchBarComp = ({
  value,
  onChange,
  placeholder='Search',
  onFocus=()=>{},
  onBlur=()=>{}
}) => {
  const searchBarRef = useRef();

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (searchBarRef.current) {
        searchBarRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, []);

  return (
    <Searchbar
      style={{ flex: 1 }}
      ref={searchBarRef}
      placeholder={placeholder}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
    />
  );
};
