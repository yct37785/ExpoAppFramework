import React, { useState, useEffect, useCallback, memo } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Screen, UI_Core, Const } from 'framework';
import { faker } from '@faker-js/faker';
const _ = require('lodash');

const ListTypes = {
  flashlist: UI_Core.ListImplementationType.flashlist,
  flatlist: UI_Core.ListImplementationType.flatlist,
} as const;

/******************************************************************************************************************
 * List demo
 * 
 * Displays a sample screen with a search bar, filter options, and a list of products.
 ******************************************************************************************************************/
const ListScreen: Screen.ScreenType = ({ navigation, route }) => {
  const [listType, setListType] = useState<UI_Core.ListImplementationType>(UI_Core.ListImplementationType.flashlist);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI_Core.ListItem[]>([]);
  const [matChipsSchema, setMatChipsSchema] = useState<Set<string>>(new Set());
  const [filterMap, setFilterMap] = useState<UI_Core.ListFilterMap>({ 'material': new Set() });

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
  const createRandomProduct = (): UI_Core.ListItem => {
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
  const renderItem: UI_Core.renderListItemFunc = useCallback((item: UI_Core.ListItem, index: number): React.ReactNode => {
    return (
      <View style={{ flex: 1, paddingVertical: Const.padSize }}>
        <UI_Core.HighlightText query={searchQuery} variant={'titleSmall'}>{item.searchable.name}</UI_Core.HighlightText>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: item.none.img }}
          resizeMode={'contain'}
        />
        <UI_Core.Text variant='labelMedium'>{`material: ${item.filterable.material}`}</UI_Core.Text>
        <UI_Core.HighlightText query={searchQuery} variant={'bodyMedium'}>{item.searchable.desc}</UI_Core.HighlightText>
        <UI_Core.Divider style={{ marginTop: Const.padSize }} />
      </View>
    );
  }, [searchQuery]);

  function LeftContent() {
    return <View>
      <UI_Core.TextInput
        type='search'
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='search'
      />
    </View>
  }

  return (
    <Screen.ScreenWrapper LeftContent={LeftContent}>
      <UI_Core.VerticalLayout>

        {/* filter menu */}
        <ScrollView horizontal={true}>
          <UI_Core.ChipOptions style={{ width: 700 }}
            schema={matChipsSchema} onSelected={onChipsSelected} />
        </ScrollView>

        {/* toggle Flashlist vs FlatList */}
        <UI_Core.RadioGroup
          options={ListTypes}
          value={listType} onValueChange={(s: string) => setListType(s as UI_Core.ListImplementationType)} />

        {/* list */}
        <UI_Core.List
          dataArr={productList}
          query={searchQuery}
          filterMap={filterMap}
          renderItem={renderItem}
          listImplementationType={listType}
        />
      </UI_Core.VerticalLayout>
    </Screen.ScreenWrapper>
  );
};

export default memo(ListScreen);