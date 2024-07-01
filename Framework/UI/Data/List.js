/*****************************************************************************************
 * general use case list that accepts user-defined filtering function
*****************************************************************************************/
import React, { useState, useEffect, useContext, memo } from 'react';
import { View, FlatList } from 'react-native';
import BigList from 'react-native-big-list';
import { LocalDataContext } from '../../Contexts/LocalDataContext';

/**
 * ListComp Component
 * 
 * Combined List component supporting both BigList and FlatList.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of data items to be displayed in the list.
 * @param {Function} props.filterFunction - Function to filter the data items.
 * @param {Function} props.renderItem - Function to render each item in the list.
 * @param {string} [props.listType='biglist'] - Type of list to display, either 'biglist' or 'flatlist'.
 * @param {number} props.rowHeight - Height of each row in the list.
 * @returns {JSX.Element} The ListComp component.
 */
const ListComp = ({
  data,
  filterFunction,
  renderItem,
  listType = 'biglist',
  rowHeight,
  ...props
}) => {
  const { debugMode } = useContext(LocalDataContext);
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
    <View style={{ width: '100%', flex: 1, backgroundColor: debugMode ? '#ff6666' : 'transparent' }}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
};

export default memo(ListComp);