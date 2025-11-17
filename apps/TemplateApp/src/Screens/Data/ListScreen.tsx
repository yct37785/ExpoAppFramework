import React, { useState, useEffect, memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Screen, UI, Const } from 'framework';
import { faker } from '@faker-js/faker';

const ListTypes = {
  flashlist: UI.ListImplementationType.flashlist,
  flatlist: UI.ListImplementationType.flatlist,
} as const;

/******************************************************************************************************************
 * List demo
 *
 * Demonstrates:
 *  - Search bar wired to List `query`
 *  - Filtering via ChipOptions + ListFilterMap
 *  - Switching between FlashList / FlatList
 *  - Simple, production-like list row styling with dividers
 ******************************************************************************************************************/
const ListScreen: Screen.ScreenType = () => {
  const [listType, setListType] = useState<UI.ListImplementationType>(
    UI.ListImplementationType.flashlist
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI.ListItem[]>([]);
  const [matChipsSchema, setMatChipsSchema] = useState<Set<string>>(new Set());
  const [filterMap, setFilterMap] = useState<UI.ListFilterMap>({
    material: new Set(),
  });

  useEffect(() => {
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });

    const matNext: Set<string> = new Set();
    fakeData.forEach((item) => {
      matNext.add(item.filterable.material);
    });

    setMatChipsSchema(matNext);
    setProductList(fakeData);
  }, []);

  /**
   * creates a random product object generated with FakerJS
   */
  const createRandomProduct = (): UI.ListItem => {
    return {
      searchable: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        desc: faker.commerce.productDescription(),
      },
      filterable: {
        material: faker.commerce.productMaterial().toLowerCase(),
      },
      none: {
        img: faker.image.urlPicsumPhotos(),
      },
    };
  };

  /**
   * handles selection of material chips
   */
  function onChipsSelected(selectedValues: Set<string>) {
    filterMap.material = selectedValues;
    setFilterMap({ ...filterMap });
  }

  /**
   * render each item as a simple list row with a divider
   */
  const renderItem: UI.renderListItemFunc = (item, index) => {
    return (
      <View>
        <UI.Box style={styles.row}>
          <UI.HorizontalLayout gap={1}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.img}
                source={{ uri: item.none.img }}
                resizeMode='cover'
              />
            </View>

            {/* Text content */}
            <UI.VerticalLayout flex={1} gap={0}>
              {/* Name */}
              <UI.HighlightText query={searchQuery} variant='titleSmall'>
                {item.searchable.name}
              </UI.HighlightText>

              {/* Material line */}
              <UI.Text variant='labelSmall' color='label'>
                {`material: ${item.filterable.material}`}
              </UI.Text>

              {/* Description */}
              <UI.HighlightText
                query={searchQuery}
                variant='bodySmall'
                numberOfLines={2}
                style={styles.description}
              >
                {item.searchable.desc}
              </UI.HighlightText>
            </UI.VerticalLayout>
          </UI.HorizontalLayout>
        </UI.Box>
        <UI.Divider spacing={0} />
      </View>
    );
  };

  /**
   * LeftContent for ScreenLayout: search bar in the app bar
   */
  const leftContent = (
    <View>
      <UI.TextInput
        type='search'
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='Search'
      />
    </View>
  );

  return (
    <Screen.ScreenLayout LeftContent={leftContent} showTitle={false}>
      {/* Main content area – List is primary, no outer scroll to avoid nested scrolling */}
      <UI.VerticalLayout gap={1}>
        {/* Intro / header */}
        <UI.Box>
          <UI.Text variant='titleLarge'>List</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            The <UI.Text variant='bodySmall' color='label'>List</UI.Text> component
            renders large data sets with search and filters. You provide a{' '}
            <UI.Text variant='bodySmall' color='label'>
              renderItem
            </UI.Text>{' '}
            function, and List handles query matching, filtering and efficient
            rendering underneath (FlashList / FlatList).
          </UI.Text>
        </UI.Box>

        {/* Filter (collapsible) */}
        <UI.CollapsibleContainer text='Filter' icon='tune'>
          <UI.Box mt={1}>
            <UI.Text variant='bodySmall' color='label'>
              This example filters by{' '}
              <UI.Text variant='bodySmall' color='label'>
                material
              </UI.Text>
              . The selected chip values are stored in{' '}
              <UI.Text variant='bodySmall' color='label'>
                ListFilterMap
              </UI.Text>{' '}
              and applied before rendering.
            </UI.Text>

            <UI.HorizontalLayout constraint='scroll' flex={0}>
              <UI.ChipOptions
                schema={matChipsSchema}
                onSelected={onChipsSelected}
                style={{ width: 700 }}
              />
            </UI.HorizontalLayout>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* List implementation (collapsible) */}
        <UI.CollapsibleContainer
          text='List implementation'
          icon='swap-vertical'
        >
          <UI.Box mt={1}>
            <UI.Text variant='bodySmall' color='label'>
              Choose which list engine to use under the hood:
            </UI.Text>
            <UI.Text variant='bodySmall' color='label'>
              •{' '}
              <UI.Text variant='bodySmall' color='label'>
                FlashList
              </UI.Text>{' '}
              – optimized for large, high-performance lists.
            </UI.Text>
            <UI.Text variant='bodySmall' color='label'>
              •{' '}
              <UI.Text variant='bodySmall' color='label'>
                FlatList
              </UI.Text>{' '}
              – standard React Native list component.
            </UI.Text>

            <UI.RadioGroup
              options={ListTypes}
              value={listType}
              onValueChange={(s: string) =>
                setListType(s as UI.ListImplementationType)
              }
            />
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* List itself */}
        <UI.Box flex={1}>
          <UI.List
            dataArr={productList}
            query={searchQuery}
            filterMap={filterMap}
            renderItem={renderItem}
            listImplementationType={listType}
          />
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingHorizontal: Const.padSize,
    paddingVertical: Const.padSize,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: Const.padSize,
    overflow: 'hidden',
    marginRight: Const.padSize,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  description: {
    marginTop: Const.padSize / 2,
  },
});

export default memo(ListScreen);
