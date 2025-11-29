import React, { useMemo, memo } from 'react';
import { View, FlatList, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListImplementationType, ListItem, ListType } from './List.types';

/******************************************************************************************************************
 * List implementation.
 *
 * Features:
 * - Text search across `item.searchable`
 * - Filtering via `filterMap` (Set-based per category)
 * - Pluggable list engine (FlashList / FlatList)
 * - Optional empty state component
 ******************************************************************************************************************/
export const List: ListType = memo(
  ({
    dataArr = [],
    query = '',
    filterMap = {},
    renderItem,
    listImplementationType = ListImplementationType.flashlist,
    emptyComponent,
    style,
  }) => {
    /**
     * Filters the dataset using both search and filter criteria.
     */
    const filteredData = useMemo(() => {
      const hasQuery = query.trim().length > 0;
      const hasAnyFilters = Object.values(filterMap).some(
        (set: Set<string>) => set && set.size > 0
      );

      // Fast path: no search and no active filters → return original data
      if (!hasQuery && !hasAnyFilters) {
        return dataArr;
      }

      const normalizedQuery = query.toLowerCase();

      return dataArr.filter((item) => {
        // --- search ---
        let matchesSearch = true;
        if (hasQuery) {
          const searchable = item.searchable || {};
          matchesSearch = Object.values(searchable).some((value) =>
            String(value).toLowerCase().includes(normalizedQuery)
          );
        }

        // --- filters ---
        let matchesFilter = true;
        if (hasAnyFilters) {
          matchesFilter = Object.entries(filterMap).every(
            ([category, categoryValues]) => {
              const set = categoryValues as Set<string>;
              const hasFilters = set && set.size > 0;
              if (!hasFilters) return true;

              const itemValue = item.filterable?.[category] || '';
              return set.has(itemValue);
            }
          );
        }

        return matchesSearch && matchesFilter;
      });
    }, [dataArr, query, filterMap]);

    /**
     * Adapter to wrap renderItem into FlatList/FlashList signature.
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
     * Prefer a stable key if the item has an "id" in searchable.
     * Falls back to index as a last resort.
     */
    const keyExtractor = (item: ListItem, index: number) => {
      const maybeId = (item.searchable as any)?.id;
      return typeof maybeId === 'string' && maybeId.length > 0
        ? maybeId
        : index.toString();
    };

    /**
     * Optional empty state component.
     */
    const ListEmptyComponent = emptyComponent
      ? () => <>{emptyComponent}</>
      : undefined;

    const sharedListProps = {
      data: filteredData,
      renderItem: renderListItem,
      keyExtractor,
      ListEmptyComponent,
    };

    const renderList = () => {
      if (listImplementationType === ListImplementationType.flashlist) {
        return (
          <FlashList
            {...sharedListProps}
          />
        );
      }

      return (
        <FlatList
          {...sharedListProps}
          // conservative default, keeps memory reasonable for large lists
          windowSize={5}
        />
      );
    };

    return <View style={[styles.container, style as StyleProp<ViewStyle>]}>{renderList()}</View>;
  }
);

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
