import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Image } from 'react-native';
import * as UI from '../../../Framework/Index/UI';
import * as Hooks from '../../../Framework/Index/Hooks';
import * as Const from '../../../Framework/Index/Const';
import { faker } from '@faker-js/faker';

/**
 * Displays a sample screen with a search bar, filter options, and a list of products.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleDataDisplayScreen({ navigation, route }) {
  const [listType, setListType] = useState('flashlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [chipsSchema, setChipsSchema] = useState(null);
  const [materialsSelected, setMaterialsSelected] = useState({});

  useEffect(() => {
    // Generate product list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // Generate filters
    const chipsSchema = { 'material': { label: 'Material', state: 0, children: {} } };
    const initialMaterialsSelected = {};
    fakeData.forEach((item) => {
      if (!(item.material in chipsSchema['material'].children)) {
        chipsSchema['material'].children[item.material] = { label: item.material, state: 0 };
        initialMaterialsSelected[item.material] = false;
      }
    });
    setChipsSchema(chipsSchema);
    setMaterialsSelected(initialMaterialsSelected);
    setProductList(fakeData);
  }, []);

  /**
   * Creates a random product object generated with FakerJS.
   * 
   * @returns {Object} A random product object.
   */
  const createRandomProduct = () => {
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
    };
  };

  /**
   * Handles selection of material chips.
   * 
   * TODO: params
   */
  const onMaterialChipSelected = useCallback((updatedSchema, optionPath, optionRef) => {
    const mat = optionPath.at(-1);
    if (mat in materialsSelected) {
      setMaterialsSelected((prevMaterialsSelected) => ({
        ...prevMaterialsSelected,
        [mat]: !prevMaterialsSelected[mat]
      }));
    }
    setChipsSchema(updatedSchema);
  }, [materialsSelected]);

  /**
   * Renders each item in the list.
   * 
   * @param {Object} param0.item - The item data to render.
   * @param {number} param0.index - The index of the item.
   * 
   * @returns {JSX.Element} The rendered item component.
   */
  const renderItem = (item, index) => {
    return (
      <View style={{ flex: 1, paddingVertical: Const.padSize }}>
        <UI.HighlightText text={item.searchable.name} query={searchQuery} variant={'titleSmall'} />
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: item.none.img }}
          resizeMode={'contain'}
        />
        <UI.Text variant='labelMedium'>{`material: ${item.filterable.material}`}</UI.Text>
        <UI.HighlightText text={item.searchable.desc} query={searchQuery} variant={'bodyMedium'} />
        <UI.DividerComp style={{ marginTop: Const.padSize }} />
      </View>
    );
  };

  function customHeaderContent() {
    return <UI.VerticalLayout>
      <UI.TextInput
        type="search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="search"
      />
    </UI.VerticalLayout>
  }

  return (
    <UI.BasicActivity navigation={navigation} route={route} customHeaderContent={customHeaderContent} title="Data Display Sample">
      <UI.VerticalLayout padding={Const.padSize} childMargin={Const.padSize}>

        {/* Filter menu */}
        {chipsSchema ? <UI.CollapsibleContainer toggleHeaderText="Filter">
          <UI.ChipOptions schema={chipsSchema} onSelectionChange={onMaterialChipSelected} />
        </UI.CollapsibleContainer> : null}

        {/* Toggle Flashlist vs FlatList */}
        <UI.RadioGroupToggle
          options={{
            flashlist: { label: "Flashlist" },
            flatlist: { label: "Flatlist" }
          }}
          value={listType} onValueChange={setListType} />

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