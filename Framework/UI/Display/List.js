/*****************************************************************************************
 * general use case list that accepts user-defined filtering function
*****************************************************************************************/
import React, { useState, useEffect, useContext, memo } from 'react';
import { View, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * Combined List component supporting both Flashlist and FlatList.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of data items to be displayed in the list.
 * @param {Function} props.filterFunction - Function to filter the data items.
 * @param {Function} props.renderItem - Function to render each item in the list.
 * @param {string} [props.listType='flashlist'] - Type of list to display, either 'flashlist' or 'flatlist'.
 * @param {number} props.rowHeight - Height of each row in the list.
 * @returns {JSX.Element} The ListDataDisplay component.
 */
const ListDataDisplay = ({
  data,
  filterFunction,
  renderItem: RenderItem,
  listType = 'flashlist',
  rowHeight
}) => {
  const { debugMode } = useContext(LocalDataContext);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterFunction(data));
  }, [data, filterFunction]);

  const renderListItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      <RenderItem item={item} index={index} />
      <Divider />
    </View>
  );

  const renderList = () => {
    if (listType === 'flashlist') {
      return (
        <FlashList
          data={filteredData}
          renderItem={renderListItem}
          estimatedItemSize={rowHeight}
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
    <View style={{ width: '100%', flex: 1, backgroundColor: debugMode ? '#ff6666' : 'transparent' }}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
};

export default memo(ListDataDisplay);