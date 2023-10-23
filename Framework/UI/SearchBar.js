import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar, Searchbar, Divider,
} from 'react-native-paper';
import BigList from 'react-native-big-list';

/**
 * search bar component
 */
export const SearchBarComp = ({ value, onChange, placeholder='Search' }) => {
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
      ref={searchBarRef}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
    />
  );
};