import React, { useMemo, memo } from 'react';
import { View, FlatList } from 'react-native';
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
    if (listImplementationType === ListImplementationType.flashlist) {
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
