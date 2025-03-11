import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Image } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ScreenProps } from '@screen';
import * as UI from '@ui';
import Const from '@const';
import { faker } from '@faker-js/faker';
const _ = require('lodash');

/**
 * displays a sample screen with a search bar, filter options, and a list of products
 */
const SampleListScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [listType, setListType] = useState<UI.ListType>(UI.ListType.flashlist);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI.ListItem[]>([]);
  const [matChipsSchema, setMatChipsSchema] = useState<UI.OptionSchema>({});
  const [filterMap, setFilterMap] = useState<UI.ListFilterMap>({ "material": {} });

  useEffect(() => {
    // generate product list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // generate filters
    const matChipsSchema: UI.OptionSchema = {};
    fakeData.forEach((item) => {
      if (item.filterable.material) {
        matChipsSchema[item.filterable.material] = { label: item.filterable.material, state: UI.OptionState.Unselected };
      }
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
  function onChipsSchemaUpdated(updatedSchema: UI.OptionSchema) {
    const newMaterialsSelected: Record<string, boolean> = {};
    {Object.keys(updatedSchema).map((key) => {
      if (updatedSchema[key].state === UI.OptionState.Selected) {
        newMaterialsSelected[key] = true;
      }
    })}
    filterMap.material = newMaterialsSelected;
    setMatChipsSchema({ ...updatedSchema });
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
        <Text variant='labelMedium'>{`material: ${item.filterable.material}`}</Text>
        <UI.HighlightText query={searchQuery} variant={'bodyMedium'}>{item.searchable.desc}</UI.HighlightText>
        <Divider style={{ marginTop: Const.padSize }} />
      </View>
    );
  }, [searchQuery]);

  function customHeaderContent() {
    return <View>
      <UI.TextInput
        type="search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="search"
      />
    </View>
  }

  return (
    <UI.Activity navigation={navigation} CustomHeaderComp={customHeaderContent}>
      {/* main content */}
      <UI.VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>

        {/* filter menu */}
        <UI.CollapsibleContainer toggleHeaderText="Filter">
          <UI.ChipOptions schema={matChipsSchema} setSchema={onChipsSchemaUpdated} />
        </UI.CollapsibleContainer>
        
        {/* list */}
        <UI.List
          dataArr={productList}
          query={searchQuery}
          filterMap={filterMap}
          renderItem={renderItem}
          listType={listType}
        />

      </UI.VerticalLayout>
    </UI.Activity>
  );
};

export default memo(SampleListScreen);