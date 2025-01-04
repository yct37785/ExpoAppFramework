import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/**
 * Enum for list types
 */
export enum ListType {
  flashlist = 'flashlist',
  flatlist = 'flatlist'
}

/**
 * data item props
 * - key value pairs within each of the categories are user defined as needed
 * 
 * @param searchable - Values will be querable.
 * @param filterable - values will be filterable.
 * @param none - No querying or filtering will be done on values here.
 */
export interface IListDataItem {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
}

/**
 * filter item props
 * - determine if key in IListDataItem.filterable is filtered by equality comparison with its value
 */
export interface IListFilterMap {
  [key: string]: string;
}

/**
 * render list item props
 */
export type renderListItemProps = (item: IListDataItem, index: number) => React.ReactNode;

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
  dataArr: IListDataItem[];
  query: string;
  filter: IListFilterMap;
  renderItem: renderListItemProps;
  listType?: ListType;
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
  listType = ListType.flashlist,
  estimatedRowHeight = 250,
  style = {}
}) => {
  const [filteredData, setFilteredData] = useState<IListDataItem[]>([]);

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
  const renderListItem = ({ item, index }: { item: IListDataItem, index: number }) => {
    return (
      <View style={{ flex: 1 }}>
        {renderItem(item, index)}
      </View>
    );
  }

  /**
   * Chooses between FlashList and FlatList based on the `listType` prop.
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
}

export default memo(ListDataDisplay);
