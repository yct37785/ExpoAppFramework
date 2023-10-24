import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard, FlatList } from 'react-native';
// UI
import {
  useTheme, Text, Button, Appbar, Searchbar, Divider,
} from 'react-native-paper';
import BigList from 'react-native-big-list';

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

/**
 * BigList version
 */
export const SearchableBigListComp = ({ 
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
 * Flatlist version
 * - no fixed height support, use this if you need dynamic height row items
 */
export const SearchableFlatListComp = ({ 
  data,
  queryFunction,
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
        <FlatList 
          data={filteredData}
          renderItem={renderItem}
          {...props}
          windowSize={5}
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