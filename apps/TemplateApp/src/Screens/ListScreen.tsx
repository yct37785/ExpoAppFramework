import React, { useState, useEffect, useCallback, memo } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Screen, UI, Const } from 'framework';
import { faker } from '@faker-js/faker';
const _ = require('lodash');

const ListTypes = {
  flashlist: UI.ListImplementationType.flashlist,
  flatlist: UI.ListImplementationType.flatlist,
} as const;

/******************************************************************************************************************
 * List demo
 * 
 * Displays a sample screen with a search bar, filter options, and a list of products.
 ******************************************************************************************************************/
const ListScreen: Screen.ScreenType = ({ navigation, route }) => {
  const [listType, setListType] = useState<UI.ListImplementationType>(UI.ListImplementationType.flashlist);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI.ListItem[]>([]);
  const [matChipsSchema, setMatChipsSchema] = useState<Set<string>>(new Set());
  const [filterMap, setFilterMap] = useState<UI.ListFilterMap>({ 'material': new Set() });

  useEffect(() => {
    // generate product list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // generate filters
    const matChipsSchema: Set<string> = new Set();
    fakeData.forEach((item) => {
      matChipsSchema.add(item.filterable.material);
    });
    setMatChipsSchema(matChipsSchema);
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
        material: faker.commerce.productMaterial().toLowerCase()
      },
      none: {
        img: faker.image.urlPicsumPhotos(),
      }
    }
  };

  /**
   * handles selection of material chips
   */
  function onChipsSelected(selectedValues: Set<string>) {
    filterMap.material = selectedValues;
    setFilterMap({ ...filterMap });
  };

  /**
   * renders each item in the list
   */
  const renderItem: UI.renderListItemFunc = useCallback((item: UI.ListItem, index: number): React.ReactNode => {
    return (
      <View style={{ flex: 1, paddingVertical: Const.padSize }}>
        <UI.HighlightText query={searchQuery} variant={'titleSmall'}>{item.searchable.name}</UI.HighlightText>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: item.none.img }}
          resizeMode={'contain'}
        />
        <UI.Text variant='labelMedium'>{`material: ${item.filterable.material}`}</UI.Text>
        <UI.HighlightText query={searchQuery} variant={'bodyMedium'}>{item.searchable.desc}</UI.HighlightText>
        <UI.Divider style={{ marginTop: Const.padSize }} />
      </View>
    );
  }, [searchQuery]);

  function LeftContent() {
    return <View>
      <UI.TextInput
        type='search'
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='search'
      />
    </View>
  }

  return (
    <Screen.ScreenLayout LeftContent={LeftContent}>
      <UI.VerticalLayout>

        {/* filter menu */}
        <ScrollView horizontal={true}>
          <UI.ChipOptions style={{ width: 700 }}
            schema={matChipsSchema} onSelected={onChipsSelected} />
        </ScrollView>

        {/* toggle Flashlist vs FlatList */}
        <UI.RadioGroup
          options={ListTypes}
          value={listType} onValueChange={(s: string) => setListType(s as UI.ListImplementationType)} />

        {/* list */}
        <UI.List
          dataArr={productList}
          query={searchQuery}
          filterMap={filterMap}
          renderItem={renderItem}
          listImplementationType={listType}
        />
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(ListScreen);