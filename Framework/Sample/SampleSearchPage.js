import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4, iconSizeSmall } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, RadioButton, Chip
} from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { CollapsibleComp, AccordionComp } from '../UI/Collapsible';
import { SearchBarComp, SearchableBigListComp, SearchableFlatListComp, highlightSearchText } from '../UI/SearchBar';
// data
import { DataContext } from '../Common/DataContext';
// dev
import { faker } from '@faker-js/faker';

/**
 * sample search bar page
 */
export default function SampleSearchPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const { userData, setUserData } = useContext(DataContext);
  const [listType, setListType] = useState('biglist');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [materialsSelected, setMaterialsSelected] = useState({});
  const ROW_HEIGHT = 250;

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (userData) {
      console.log(JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    // generate prod list sample
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 1000 });
    // generate filters
    const materialsSelected = {};
    fakeData.map((item) => {
      materialsSelected[item.material] = false;
    });
    setMaterialsSelected(materialsSelected);
    setProductList(fakeData);
  }, []);

  const createRandomProduct = () => {
    return {
      id: faker.string.uuid(),
      img: faker.image.urlPicsumPhotos(),
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      material: faker.commerce.productMaterial()
    };
  }

  /**------------------------------------------------------------------------------------*
   * Filter
   *------------------------------------------------------------------------------------*/
  const FilterHeader = React.memo(({isCollapsed}) => {
    return (
      <View style={{ padding: padSize, paddingLeft: padSize2, flexDirection: 'row', alignItems: 'center' }}>
        <Text>Filters</Text>
        {isCollapsed ? <MaterialIcons name='keyboard-arrow-down' color={theme.colors.text} size={iconSizeSmall} style={{ paddingLeft: padSize05 }} /> :
          <MaterialIcons name='keyboard-arrow-up' color={theme.colors.text} size={iconSizeSmall} style={{ paddingLeft: padSize05 }} />}
      </View>
    );
  });

  const FilterContent = React.memo(({isCollapsed}) => {
    return (
      <View style={{ width: '100%', padding: padSize, paddingHorizontal: padSize2 }}>
        <Text variant='labelSmall'>Materials</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Object.keys(materialsSelected).map((mat) => {
            return <Chip key={mat} selected={materialsSelected[mat]} showSelectedCheck={true} style={{ margin: padSize05 }}
              onPress={() => onMaterialChipSelected(mat)}>{mat}</Chip>
          })}
        </View>
      </View>
    );
  });

  const onMaterialChipSelected = (mat) => {
    if (mat in materialsSelected) {
      materialsSelected[mat] = !materialsSelected[mat];
      setMaterialsSelected({ ...materialsSelected });
    }
  };

  /**------------------------------------------------------------------------------------*
   * List
   *------------------------------------------------------------------------------------*/
  const filterProducts = (data) => {
    if (!searchQuery) return data;
    return data.filter(
      (item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ListItem = React.memo(({ item, searchQuery, highlightSearchText }) => {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ width: '100%', padding: padSize }}>
          {highlightSearchText(item.name, searchQuery, 'titleSmall')}
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: item.img,
            }}
            resizeMode={'contain'}
          />
          {highlightSearchText(item.material, searchQuery, 'labelMedium', 'material: ')}
          {highlightSearchText(item.desc, searchQuery, 'bodyMedium')}
        </View>
        <Divider />
      </View>
    );
  });


  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        item={item}
        searchQuery={searchQuery}
        highlightSearchText={highlightSearchText}
      />
    );
  };

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {/* header and search bar */}
      <Appbar.Header>
        <SearchBarComp
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Appbar.Header>
      {/* filter menu */}
      <CollapsibleComp
        renderHeader={(isCollapsed) => { return <FilterHeader isCollapsed={isCollapsed} /> }}
        renderContent={(isCollapsed) => { return <FilterContent isCollapsed={isCollapsed} /> }}
      />
      {/* <AccordionComp
        sections={[0]}
        renderHeader={renderFilterHeader}
        renderContent={renderFilterContent}
      /> */}
      {/* toggle biglist vs flatlist */}
      <View style={{ flex: 1, padding: padSize }}>
        <View style={{ padding: padSize }}>
          <RadioButton.Group onValueChange={newValue => setListType(newValue)} value={listType}>
            <View style={{ flexDirection: 'row' }}>
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
        </View>
        {/* main content */}
        {listType == 'biglist' ? <SearchableBigListComp
          data={productList}
          filterFunction={filterProducts}
          rowHeight={ROW_HEIGHT}
          renderItem={renderItem}
        /> : null}
        {listType == 'flatlist' ? <SearchableFlatListComp
          data={productList}
          filterFunction={filterProducts}
          renderItem={renderItem}
        /> : null}
      </View>
    </View>
  );
}