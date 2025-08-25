import React, { useMemo, memo } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/******************************************************************************************************************
 * List type
 *
 * Enum defining which list implementation to use.
 * - flashlist → Uses @shopify/flash-list for improved performance with large datasets
 * - flatlist → Uses React Native's built-in FlatList
 ******************************************************************************************************************/
export enum ListType {
  flashlist = 'flashlist',
  flatlist = 'flatlist',
}

/******************************************************************************************************************
 * List item
 *
 * Defines the structure of a single list item.
 *
 * @property searchable - Key/value pairs that should be included in text search
 * @property filterable - Key/value pairs that can be filtered via equality comparison
 * @property none - Arbitrary values not used for search or filter
 *
 * @example:
 * ```ts
 * const item: ListItem = {
 *   searchable: { name: "Chair", desc: "Wooden" },
 *   filterable: { material: "wood" },
 *   none: { id: "123" },
 * };
 * ```
 ******************************************************************************************************************/
export type ListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
};

/******************************************************************************************************************
 * List filter map
 *
 * Represents active filters for the list.
 * Each key corresponds to a filterable category, and its Set<string> defines allowed values.
 *
 * @example:
 * ```ts
 * const filters: ListFilterMap = {
 *   material: new Set(["wood", "cloth"]),
 * };
 * ```
 ******************************************************************************************************************/
export type ListFilterMap = {
  [key: string]: Set<string>;
};

/******************************************************************************************************************
 * Function signature for rendering a list item.
 *
 * @param item - list item data
 * @param index - item index in the array
 * 
 * @returns ReactNode
 ******************************************************************************************************************/
export type renderListItemFunc = (item: ListItem, index: number) => React.ReactNode;

type ListDataDisplayProps = {
  dataArr: ListItem[];
  query: string;
  filterMap: ListFilterMap;
  renderItem: renderListItemFunc;
  listType?: ListType;
  estimatedRowHeight?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * List component
 *
 * A combined list component that supports both FlashList and FlatList.
 * Encapsulates search + filter logic and delegates rendering via `renderItem`.
 *
 * Features:
 * - Integrated text search across ListItem.searchable values
 * - Filter system using ListItem.filterable keys
 * - Switchable between FlatList and FlashList
 *
 * @usage
 * ```tsx
 * <List
 *   dataArr={items}
 *   query={searchTerm}
 *   filterMap={{ material: new Set(["wood"]) }}
 *   renderItem={(item) => <Text>{item.searchable.name}</Text>}
 *   listType={ListType.flashlist}
 * />
 * ```
 *
 * @param dataArr - input dataset of ListItem
 * @param query - search query
 * @param filterMap - active filters
 * @param renderItem - function to render a row
 * @param listType - list implementation (default: flashlist)
 * @param estimatedRowHeight - estimated row size for FlashList optimization (FlashList only)
 * @param style - extra container styles
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const List: React.FC<ListDataDisplayProps> = memo(({
  dataArr = [],
  query = '',
  filterMap = {},
  renderItem,
  listType = ListType.flashlist,
  estimatedRowHeight = 250,
  style = {},
}) => {
  /**
   * filters the dataset using both search and filter criteria
   */
  const filteredData = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return dataArr.filter((item) => {
      const matchesSearch = Object.values(item.searchable || {}).some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );
      const matchesFilter = Object.entries(filterMap).every(([category, categoryValues]) => {
        const hasFilters = categoryValues.size > 0;
        return !hasFilters || categoryValues.has(item.filterable?.[category] || '');
      });

      return matchesSearch && matchesFilter;
    });
  }, [dataArr, query, filterMap]);

  /**
   * adapter to wrap renderItem into FlatList/FlashList signature
   */
  const renderListItem = ({ item, index }: { item: ListItem; index: number }) => (
    <View style={{ flex: 1 }}>{renderItem(item, index)}</View>
  );

  /**
   * selects the underlying list implementation
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
    }
    return (
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(_, index) => index.toString()}
        windowSize={5}
      />
    );
  };

  return <View style={[{ width: '100%', height: '100%' }, style]}>{renderList()}</View>;
});
