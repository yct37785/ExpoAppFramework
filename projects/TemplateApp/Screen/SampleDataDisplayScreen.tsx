import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Image } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';
import * as PropTypes from '../../../Framework/Index/PropTypes';
import { faker } from '@faker-js/faker';

const ListTypes = {
  flashlist: UI.ListType.flashlist,
  flatlist: UI.ListType.flatlist,
} as const;

/**
 * Displays a sample screen with a search bar, filter options, and a list of products.
 */
const SampleDataDisplayScreen: React.FC<PropTypes.IScreenProps> = ({ navigation, route }) => {
  const [listType, setListType] = useState<UI.ListType>(UI.ListType.flashlist);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI.IListDataItem[]>([]);
  //const [chipsSchema, setChipsSchema] = useState<Record<string, {}>>({});
  const [materialsSelected, setMaterialsSelected] = useState<UI.IFilterItem>({});

  useEffect(() => {
    // Generate product list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // // Generate filters
    // const chipsSchema = { 'material': { label: 'Material', state: 0, children: {} } }
    // const initialMaterialsSelected = {}
    // fakeData.forEach((item) => {
    //   if (!(item.material in chipsSchema['material'].children)) {
    //     chipsSchema['material'].children[item.material] = { label: item.material, state: 0 }
    //     initialMaterialsSelected[item.material] = false;
    //   }
    // });
    // setChipsSchema(chipsSchema);
    // setMaterialsSelected(initialMaterialsSelected);
    setProductList(fakeData);
  }, []);

  /**
   * Creates a random product object generated with FakerJS.
   */
  const createRandomProduct = (): UI.IListDataItem => {
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
  }

  /**
   * Handles selection of material chips.
   * 
   * TODO: params
   */
  // const onMaterialChipSelected = useCallback((updatedSchema, optionPath, optionRef) => {
  //   const mat = optionPath.at(-1);
  //   if (mat in materialsSelected) {
  //     setMaterialsSelected((prevMaterialsSelected) => ({
  //       ...prevMaterialsSelected,
  //       [mat]: !prevMaterialsSelected[mat]
  //     }));
  //   }
  //   setChipsSchema(updatedSchema);
  // }, [materialsSelected]);

  /**
   * Renders each item in the list.
   */
  const renderItem: UI.renderListItemProps = (item: UI.IListDataItem, index: number): React.ReactNode => {
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
        <UI.DividerComp style={{ marginTop: Const.padSize }} />
      </View>
    );
  }

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
    <UI.BasicActivity navigation={navigation} CustomHeaderComp={customHeaderContent} title="">
      <UI.VerticalLayout padding={Const.padSize} childMargin={Const.padSize}>

        {/* Filter menu */}
        {/* {chipsSchema ? <UI.CollapsibleContainer toggleHeaderText="Filter">
          <UI.ChipOption schema={chipsSchema} onSelectionChange={onMaterialChipSelected} />
        </UI.CollapsibleContainer> : null} */}

        {/* Toggle Flashlist vs FlatList */}
        <UI.RadioGroupToggle
          options={ListTypes}
          value={listType} onValueChange={(s: string) => setListType(s as UI.ListType)} />

        {/* List comp */}
        <UI.ListDataDisplay
          dataArr={productList}
          query={searchQuery}
          filter={materialsSelected}
          renderItem={renderItem}
          listType={listType}
        />

      </UI.VerticalLayout>
    </UI.BasicActivity>
  );
}

export default memo(SampleDataDisplayScreen);