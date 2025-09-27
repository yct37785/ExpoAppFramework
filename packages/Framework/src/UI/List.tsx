import React, { useMemo, memo } from 'react';
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/******************************************************************************************************************
 * Select which list implementation to use.
 * - flashlist → Uses @shopify/flash-list for improved performance with large datasets
 * - flatlist → Uses React Native's built-in FlatList
 ******************************************************************************************************************/
export enum ListType {
  flashlist = 'flashlist',
  flatlist = 'flatlist',
}

/******************************************************************************************************************
 * Define the structure of a single list item used for search and filter.
 *
 * @property searchable - key/value pairs included in text search
 * @property filterable - key/value pairs used for equality-based filtering
 * @property none - arbitrary values not involved in search or filter
 *
 * @usage
 * ```ts
 * const item: ListItem = {
 *   searchable: { name: 'chair', desc: 'wooden' },
 *   filterable: { material: 'wood' },
 *   none: { id: '123' }
 * }
 * ```
 ******************************************************************************************************************/
export type ListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
};

/******************************************************************************************************************
 * Represent active filters applied to the list.
 *
 * @usage
 * ```ts
 * const filters: ListFilterMap = {
 *   material: new Set(['wood', 'cloth'])
 * }
 * ```
 ******************************************************************************************************************/
export type ListFilterMap = {
  [key: string]: Set<string>;
};

/******************************************************************************************************************
 * Function signature for rendering a list item row.
 *
 * @param item - list item data
 * @param index - item index
 *
 * @usage
 * ```ts
 * const renderItem: renderListItemFunc = (item) => <Text>{item.searchable.name}</Text>
 * ```
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
 * Render a searchable, filterable list backed by either FlashList or FlatList.
 * Encapsulates filtering logic and delegates row rendering to a caller-provided renderer.
 *
 * @param props - list props:
 *   - dataArr: ListItem[] - input dataset to render
 *   - query: string - case-insensitive search query applied to searchable values
 *   - filterMap: ListFilterMap - active filters applied to filterable keys
 *   - renderItem: renderListItemFunc - function that renders a row for a given item
 *   - listType?: ListType - underlying list implementation (default flashlist)
 *   - estimatedRowHeight?: number - estimated row size for flashlist optimization
 *   - style?: StyleProp<ViewStyle> - optional wrapper style
 *
 * @usage
 * ```tsx
 * <List
 *   dataArr={items}
 *   query={searchTerm}
 *   filterMap={{ material: new Set(['wood']) }}
 *   renderItem={(it) => <Text>{it.searchable.name}</Text>}
 *   listType={ListType.flashlist}
 * />
 * ```
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
