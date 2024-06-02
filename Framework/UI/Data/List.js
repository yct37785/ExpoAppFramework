/*****************************************************************************************
 * general use case list that accepts user-defined filtering function
*****************************************************************************************/
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import BigList from 'react-native-big-list';
import PropTypes from 'prop-types';

/**
 * SearchableListComp Component
 * 
 * Combined List component supporting both BigList and FlatList.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of data items to be displayed in the list.
 * @param {Function} props.filterFunction - Function to filter the data items.
 * @param {Function} props.renderItem - Function to render each item in the list.
 * @param {string} [props.listType='biglist'] - Type of list to display, either 'biglist' or 'flatlist'.
 * @param {number} props.rowHeight - Height of each row in the list.
 * @returns {JSX.Element} The SearchableListComp component.
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