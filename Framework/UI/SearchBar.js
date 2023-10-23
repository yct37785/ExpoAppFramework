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

/**
 * BigList
 */
export const SearchableListComp = ({ 
  data, 
  queryFunction, 
  rowHeight, 
  renderItem, 
  ...props 
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(queryFunction(data));
  }, [data, queryFunction]);

  return (
    <View style={{ width: '100%', flex: 1 }}>
      {filteredData.length > 0 ? 
        <BigList 
          data={filteredData} 
          renderItem={renderItem} 
          itemHeight={rowHeight} 
          {...props}
        /> 
      : null}
    </View>
  );
};

/**
 * highlights search text
 */
export const highlightSearchText = (text, query, variant='bodyMedium', label='') => {
  if (!query) {
    return <Text variant={variant}>{`${label}${text}`}</Text>;
  }
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <Text variant={variant}>
      {label}
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text variant={variant} key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};