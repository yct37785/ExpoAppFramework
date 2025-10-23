import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Select which list implementation to use.
 * 
 * @property flashlist  - Uses @shopify/flash-list for improved performance with large datasets
 * @property flatlist   - Uses React Native's built-in FlatList
 ******************************************************************************************************************/
export enum ListImplementationType {
  flashlist = 'flashlist',
  flatlist = 'flatlist',
}

/******************************************************************************************************************
 * Define the structure of a single list item used for search and filter.
 *
 * @property searchable   - Key/value pairs included in text search
 * @property filterable   - Key/value pairs used for equality-based filtering
 * @property none         - Arbitrary values not involved in search or filter
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
 * @param item  - List item data
 * @param index - Item index
 *
 * @usage
 * ```ts
 * const renderItem: renderListItemFunc = (item) => <Text>{item.searchable.name}</Text>
 * ```
 ******************************************************************************************************************/
export type renderListItemFunc = (item: ListItem, index: number) => React.ReactNode;

/******************************************************************************************************************
 * List props.
 * 
 * @property dataArr      - Input dataset to render
 * @property query        - Case-insensitive search query applied to searchable values
 * @property filterMap    - Active filters applied to filterable keys
 * @property renderItem   - Function that renders a row for a given item
 * @property listType?    - Underlying list implementation (default flashlist)
 * @property style?       - Optional wrapper style
 ******************************************************************************************************************/
export type ListProps = {
  dataArr: ListItem[];
  query: string;
  filterMap: ListFilterMap;
  renderItem: renderListItemFunc;
  listImplementationType?: ListImplementationType;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A scrollable vertical container for presenting lists of items, searchable and filterable.
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
export type ListType = React.FC<ListProps>;
