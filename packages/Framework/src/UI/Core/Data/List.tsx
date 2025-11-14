import React, { useMemo, memo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListImplementationType, ListItem, ListType } from './List.types';

/******************************************************************************************************************
 * List implementation.
 ******************************************************************************************************************/
export const List: ListType = memo(({
  dataArr = [],
  query = '',
  filterMap = {},
  renderItem,
  listImplementationType = ListImplementationType.flashlist,
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

      const matchesFilter = Object.entries(filterMap).every(
        ([category, categoryValues]) => {
          const hasFilters = categoryValues.size > 0;
          return (
            !hasFilters ||
            categoryValues.has(item.filterable?.[category] || '')
          );
        }
      );

      return matchesSearch && matchesFilter;
    });
  }, [dataArr, query, filterMap]);

  /**
   * adapter to wrap renderItem into FlatList/FlashList signature
   */
  const renderListItem = ({
    item,
    index,
  }: {
    item: ListItem;
    index: number;
  }) => (
    <View style={styles.itemWrapper}>{renderItem(item, index)}</View>
  );

  /**
   * shared props across both list implementations
   */
  const sharedListProps = {
    data: filteredData,
    renderItem: renderListItem,
    keyExtractor: (_: ListItem, index: number) => index.toString(),
  };

  /**
   * render
   */
  return (
    <View style={[styles.container, style]}>
      {listImplementationType === ListImplementationType.flashlist ? (
        <FlashList
          {...sharedListProps}
        />
      ) : (
        <FlatList
          {...sharedListProps}
          windowSize={5}
        />
      )}
    </View>
  );
});

/******************************************************************************************************************
 * styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    flex: 1,
  },
});