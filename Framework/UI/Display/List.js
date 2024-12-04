/*****************************************************************************************
 * general use case list that accepts user-defined filtering function
*****************************************************************************************/
import React, { useState, useEffect, useContext, memo } from 'react';
import { View, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * Combined List component supporting both Flashlist and FlatList. Supports dynamical height rows
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of data items to be displayed in the list.
 * @param {Function} props.filterFunction - Function to filter the data items.
 * @param {Function} props.renderItem - Function to render each item in the list.
 * @param {string} [props.listType='flashlist'] - Type of list to display, either 'flashlist' or 'flatlist'.
 * @param {number} [props.estimatedRowHeight=250] - Estimated height of each row in the list for FlashList to estimate lazy loadm fixed at 250.
 * 
 * @returns {JSX.Element} The ListDataDisplay component.
 */
const ListDataDisplay = ({
  data,
  filterFunction,
  renderItem: RenderItem,
  listType = 'flashlist',
  estimatedRowHeight = 250
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterFunction(data));
  }, [data, filterFunction]);

  const renderListItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      <RenderItem item={item} index={index} />
    </View>
  );

  const renderList = () => {
    if (listType === 'flashlist') {
      return (
        <FlashList
          data={filteredData}
          renderItem={renderListItem}
          estimatedItemSize={estimatedRowHeight}
        />
      );
    } else {
      return (
        <FlatList
          data={filteredData}
          renderItem={renderListItem}
          windowSize={5}
        />
      );
    }
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
};

export default memo(ListDataDisplay);