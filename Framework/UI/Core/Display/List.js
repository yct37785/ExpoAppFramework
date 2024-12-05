import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * A combined list component supporting FlashList and FlatList with filtering and searching logic encapsulated.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.dataArr - Array of data items to be displayed in the list.
 * @param {string} props.query - Current search query.
 * @param {Object} props.filter - Filter map for filtering items (key-value pairs).
 * @param {Function} props.renderItem - Function to render each item in the list.
 * @param {string} [props.listType='flashlist'] - Type of list to display, either 'flashlist' or 'flatlist'.
 * @param {number} [props.estimatedRowHeight=250] - Estimated height of each row in the list for FlashList.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The ListDataDisplay component.
 */
const ListDataDisplay = ({
  dataArr = [],
  query = '',
  filter = {},
  renderItem,
  listType = 'flashlist',
  estimatedRowHeight = 250,
  style={}
}) => {
  const [filteredData, setFilteredData] = useState([]);

  /**
   * Filters the data based on searchable and filterable fields.
   */
  const applyFilters = useCallback(() => {
    const normalizedQuery = query.toLowerCase();

    return dataArr.filter((item) => {
      // Search logic for searchable fields
      const matchesSearch =
        Object.values(item.searchable).some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      // Filter logic for filterable fields
      let matchesFilter = true;
      if (filter.size > 0) {
        matchesFilter = Object.entries(filter).every(
          ([key, value]) => item.filterable[key] === value
        );
      }

      return matchesSearch && matchesFilter;
    });
  }, [dataArr, query, filter]);

  /**
   * Updates the filtered data whenever `query`, `filter`, or `dataArr` changes.
   */
  useEffect(() => {
    setFilteredData(applyFilters());
  }, [applyFilters]);

  /**
   * Renders a single list item.
   */
  const renderListItem = useCallback(({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        {renderItem(item, index)}
      </View>
    );
  }, [renderItem]);

  /**
   * Chooses between FlashList and FlatList based on the `listType` prop.
   */
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
          keyExtractor={(item, index) => index.toString()}
          windowSize={5}
        />
      );
    }
  };

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
};

export default memo(ListDataDisplay);
