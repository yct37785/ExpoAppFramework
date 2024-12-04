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
      id: faker.string.uuid(),
      img: faker.image.urlPicsumPhotos(),
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      material: faker.commerce.productMaterial().toLowerCase()
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
   * Filters the products based on the selected materials and search query.
   * 
   * @param {Array} data - Array of product data.
   * 
   * @returns {Array} Filtered array of product data.
   */
  const filterProducts = useCallback((data) => {
    let newData = [...data];
    const allFalse = Object.values(materialsSelected).every((value) => value === false);
    if (!allFalse) {
      newData = data.filter((item) => materialsSelected[item.material]);
    }
    if (!searchQuery) return newData;
    return newData.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, materialsSelected]);

  /**
   * Renders each item in the list.
   * 
   * @param {Object} param0 - Render item parameters.
   * @param {Object} param0.item - The item data to render.
   * @param {number} param0.index - The index of the item.
   * 
   * @returns {JSX.Element} The rendered item component.
   */
  const renderItem = useCallback(
    React.memo(({ item, index }) => {
      return (
        <View style={{ flex: 1, padding: Const.padSize }}>
          <UI.HighlightText text={item.name} query={searchQuery} variant={'titleSmall'} />
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.img }}
            resizeMode={'contain'}
          />
          <UI.Text variant='labelMedium'>{`material: ${item.material}`}</UI.Text>
          <UI.HighlightText text={item.desc} query={searchQuery} variant={'bodyMedium'} />
          <UI.DividerComp style={{ marginTop: Const.padSize }} />
        </View>
      );
    }), [searchQuery]
  );

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
    <UI.BasicActivity navigation={navigation} route={route} customHeaderContent={customHeaderContent}>
      {/* Filter menu */}
      {chipsSchema ? <View style={{ paddingLeft: Const.padSize }}>
        <UI.CollapsibleContainer toggleHeaderText="Filter">
          <UI.ChipOptions schema={chipsSchema} onSelectionChange={onMaterialChipSelected} />
        </UI.CollapsibleContainer>
      </View> : null}
      {/* Toggle Flashlist vs FlatList */}
      <UI.RadioGroupToggle
        options={{
          flashlist: { label: "Flashlist" },
          flatlist: { label: "Flatlist" }
        }}
        value={listType} onValueChange={setListType} />
      <UI.ListDataDisplay
        data={productList}
        filterFunction={filterProducts}
        renderItem={renderItem}
        listType={listType}
      />
    </UI.BasicActivity>
  );
}

export default memo(SampleDataDisplayScreen);