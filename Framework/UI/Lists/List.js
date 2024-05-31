import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard, FlatList } from 'react-native';
import BigList from 'react-native-big-list';
import PropTypes from 'prop-types';

/**
 * Combined List component supporting both BigList and FlatList
 */
export const SearchableListComp = ({
  data,
  filterFunction,
  renderItem,
  listType = 'biglist',
  rowHeight,
  ...props
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterFunction(data));
  }, [data, filterFunction]);

  const renderList = () => {
    if (listType === 'biglist') {
      return (
        <BigList
          data={filteredData}
          renderItem={renderItem}
          itemHeight={rowHeight}
          {...props}
        />
      );
    } else {
      return (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          windowSize={5}
          {...props}
        />
      );
    }
  };

  return (
    <View style={{ width: '100%', flex: 1 }}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
};

SearchableListComp.propTypes = {
  data: PropTypes.array.isRequired,
  filterFunction: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  listType: PropTypes.oneOf(['biglist', 'flatlist']),
  rowHeight: PropTypes.number,
};