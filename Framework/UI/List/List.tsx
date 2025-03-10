import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * list types
 */
export enum ListType {
  flashlist = 'flashlist',
  flatlist = 'flatlist'
}

/**
 * list item define
 * - key value pairs within each of the categories are user defined as needed
 * 
 * @param searchable - Values will be querable.
 * @param filterable - values will be filterable.
 * @param none - No querying or filtering will be done on values here.
 */
export type ListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
}

/**
 * filter item props
 * - determine if key in ListDataItem.filterable is filtered by equality comparison with its value
 * 
 * Example:
 * material: { wood: 0, cloth: 0 }
 * 
 * the internal state of wood and cloth does not matter
 */
export type ListFilterMap = {
  [key: string]: Record<string, boolean>;
}

/**
 * render list item function
 */
export type renderListItemFunc = (item: ListItem, index: number) => React.ReactNode;

/**
 * @param dataArr - Array of data items to be displayed in the list.
 * @param query - Current search query.
 * @param filter - Filter map for filtering items (key-value pairs).
 * @param renderItem - Function to render each item in the list.
 * @param listType - Type of list to display, either 'flashlist' or 'flatlist'.
 * @param estimatedRowHeight - Estimated height of each row in the list for FlashList.
 * @param style - Additional style on base container.
 */
type ListDataDisplayProps = {
  dataArr: ListItem[];
  query: string;
  filterMap: ListFilterMap;
  renderItem: renderListItemFunc;
  listType?: ListType;
  estimatedRowHeight?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * a combined list component supporting FlashList and FlatList with filtering and searching logic encapsulated
 */
export const List: React.FC<ListDataDisplayProps> = memo(({
  dataArr = [],
  query = '',
  filterMap = {},
  renderItem,
  listType = ListType.flashlist,
  estimatedRowHeight = 250,
  style = {}
}) => {
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);

  /**
   * filters the data based on searchable and filterable fields
   * 
   * TODO: debounce
   */
  const applyFilters = useCallback(() => {
    const normalizedQuery = query.toLowerCase();

    return dataArr.filter((item) => {
      // search logic for searchable fields
      const matchesSearch = Object.values(item.searchable).some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

      // filter logic for filterable fields
      const matchesFilter = Object.entries(filterMap).every(
        ([category, categoryMap]) => {
          // if no filter is applied for this category, we return true (i.e., bypass filter)
          if (!categoryMap || !Object.keys(categoryMap).length) return true;
          return categoryMap.hasOwnProperty(item.filterable[category]);
        }
      );

      return matchesSearch && matchesFilter;
    });
  }, [dataArr, query, filterMap]);

  /**
   * updates the filtered data whenever `query`, `filter`, or `dataArr` changes
   */
  useEffect(() => {
    setFilteredData(applyFilters());
  }, [applyFilters]);

  /**
   * renders a single list item
   */
  const renderListItem = ({ item, index }: { item: ListItem, index: number }) => {
    return (
      <View style={{ flex: 1 }}>
        {renderItem(item, index)}
      </View>
    );
  }

  /**
   * chooses between FlashList and FlatList based on the `listType` prop
   */
  const renderList = () => {
    if (listType === ListType.flashlist) {
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
});
