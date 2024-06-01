import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar, Searchbar, Divider,
} from 'react-native-paper';

/**
 * search bar component
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