/***************************************************************************************
* showcase data UI elements
***************************************************************************************/
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text, Appbar, Divider, RadioButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { PageContainer, LinearLayout, Collapsible, ChipsContainer, highlightText } from '../../../Framework/UI/index';
import { SearchableListComp } from '../../../Framework/UI/Data/List';
import { TextInputFieldComp } from '../../../Framework/UI/Input/TextInput';
import { faker } from '@faker-js/faker';
import { LocalDataContext } from '../../../Framework/Contexts/LocalDataContext';
import { padSize05, padSize, padSize2, iconSizeSmall } from '../../../Framework/CommonVals';

/**
 * SampleSearchPage Component
 * 
 * Displays a sample page with a search bar, filter options, and a list of products.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for navigating between screens.
 * @param {Object} props.route - Route object containing route parameters.
 * @returns {JSX.Element} The SampleSearchPage component.
 */
export default function SampleSearchPage({ navigation, route }) {
  const theme = useTheme();
  const { debugMode } = useContext(LocalDataContext);
  const [listType, setListType] = useState('biglist');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [materialsSelected, setMaterialsSelected] = useState({});
  const ROW_HEIGHT = 250;

  useEffect(() => {
    // Generate product list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // Generate filters
    const initialMaterialsSelected = {};
    fakeData.forEach((item) => {
      initialMaterialsSelected[item.material] = false;
    });
    setMaterialsSelected(initialMaterialsSelected);
    setProductList(fakeData);
  }, []);

  /**
   * Creates a random product object.
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
   * @param {string} mat - The key of the selected material chip.
   */
  const onMaterialChipSelected = useCallback((mat) => {
    if (mat in materialsSelected) {
      setMaterialsSelected((prevMaterialsSelected) => ({
        ...prevMaterialsSelected,
        [mat]: !prevMaterialsSelected[mat]
      }));
    }
  }, [materialsSelected]);

  /**
   * Filters the products based on the selected materials and search query.
   * 
   * @param {Array} data - Array of product data.
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
   * ListItem Component
   * 
   * @param {Object} param0 - Component props.
   * @param {Object} param0.item - The item data to render.
   * @param {string} param0.searchQuery - The current search query.
   * @returns {JSX.Element} The ListItem component.
   */
  const ListItem = React.memo(({ item, searchQuery }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {highlightText(item.name, searchQuery, 'titleSmall')}
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.img }}
            resizeMode={'contain'}
          />
          <Text variant='labelMedium'>{`material: ${item.material}`}</Text>
          {highlightText(item.desc, searchQuery, 'bodyMedium')}
        </View>
        <Divider />
      </View>
    );
  });

  /**
   * Renders each item in the list.
   * 
   * @param {Object} param0 - Render item parameters.
   * @param {Object} param0.item - The item data to render.
   * @param {number} param0.index - The index of the item.
   * @returns {JSX.Element} The rendered item component.
   */
  const renderItem = useCallback(({ item, index }) => {
    return (
      <ListItem
        item={item}
        searchQuery={searchQuery}
        highlightText={highlightText}
      />
    );
  }, [searchQuery]);

  function customHeaderContent() {
    return <LinearLayout style={{ backgroundColor: debugMode ? '#0000ff' : 'transparent' }}>
      <TextInputFieldComp
        type="search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="search"
      />
    </LinearLayout>
  }

  return (
    <PageContainer navigation={navigation} route={route} pageName="SampleSearchPage" customHeaderContent={customHeaderContent}>
      {/* Filter menu */}
      <Collapsible toggleHeaderText="Filter">
        <View style={{ width: '100%' }}>
          <Text variant='labelSmall'>Materials</Text>
          <ChipsContainer toggledMap={materialsSelected} onChipSelected={onMaterialChipSelected} />
        </View>
      </Collapsible>
      {/* Toggle BigList vs FlatList */}
      <RadioButton.Group onValueChange={newValue => setListType(newValue)} value={listType}>
        <View style={{ flexDirection: 'row', backgroundColor: debugMode ? '#66ff99' : 'transparent' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>BigList</Text>
            <RadioButton value="biglist" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>FlatList</Text>
            <RadioButton value="flatlist" />
          </View>
        </View>
      </RadioButton.Group>
      <SearchableListComp
        data={productList}
        filterFunction={filterProducts}
        renderItem={renderItem}
        listType={listType}
        rowHeight={ROW_HEIGHT}
        customLayout="match-parent" // special prop to set flex to 1 for elems with undefined height
      />
    </PageContainer>
  );
}
