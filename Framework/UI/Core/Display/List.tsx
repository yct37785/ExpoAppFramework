import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * data item props
 * - key value pairs within each of the categories are user defined as needed
 * 
 * @param searchable - Values will be querable.
 * @param filterable - values will be filterable.
 * @param none - No querying or filtering will be done on values here.
 */
export interface IDataItem {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
}

/**
 * filter item props
 * - determine if key in IdataItem.filterable is filtered by equality comparison with its value
 */
export interface IFilterItem {
  [key: string]: string;
}

/**
 * ListDataDisplay props
 * 
 * @param dataArr - Array of data items to be displayed in the list.
 * @param query - Current search query.
 * @param filter - Filter map for filtering items (key-value pairs).
 * @param renderItem - Function to render each item in the list.
 * @param listType - Type of list to display, either 'flashlist' or 'flatlist'.
 * @param estimatedRowHeight - Estimated height of each row in the list for FlashList.
 * @param style - Additional style on base container.
 * 
 * @returns {JSX.Element} The ListDataDisplay component.
 */
export interface IListDataDisplayProps {
  dataArr: IDataItem[];
  query: string;
  filter: IFilterItem;
  renderItem: (item: IDataItem, index: number) => React.ReactNode;
  listType?: 'flashlist' | 'flatlist';
  estimatedRowHeight?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A combined list component supporting FlashList and FlatList with filtering and searching logic encapsulated.
 */
const ListDataDisplay: React.FC<IListDataDisplayProps> = ({
  dataArr = [],
  query = '',
  filter = {},
  renderItem,
  listType = 'flashlist',
  estimatedRowHeight = 250,
  style = {}
}) => {
  const [filteredData, setFilteredData] = useState<IDataItem[]>([]);

  /**
   * Filters the data based on searchable and filterable fields.
   */
  const applyFilters = useCallback(() => {
    const normalizedQuery = query.toLowerCase();

    return dataArr.filter((item) => {
      // search logic for searchable fields
      const matchesSearch =
        Object.values(item.searchable).some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      // filter logic for filterable fields
      let matchesFilter = true;
      if (Object.keys(filter).length > 0) {
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
  const renderListItem = useCallback(({ item, index }: { item: IDataItem, index: number }) => {
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
  }

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      {filteredData.length > 0 ? renderList() : null}
    </View>
  );
}

export default memo(ListDataDisplay);
