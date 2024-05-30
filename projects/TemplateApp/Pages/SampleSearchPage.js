import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { padSize05, padSize, padSize2, iconSizeSmall } from '../../../Framework/Common/Values';
import Styles from '../../../Framework/Common/Styles';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, RadioButton, Chip
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Collapsible, ChipsContainer } from '../../../Framework/UI/index';
import { SearchBarComp, SearchableBigListComp, SearchableFlatListComp, highlightSearchText } from '../../../Framework/UI/Inputs/SearchBar';
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
  const [listType, setListType] = useState('biglist');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [materialsSelected, setMaterialsSelected] = useState({});
  const ROW_HEIGHT = 250;

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/
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
      material: faker.commerce.productMaterial().toLowerCase()
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
        <ChipsContainer toggledMap={materialsSelected} onChipSelected={onMaterialChipSelected} />
      </View>
    );
  });

  const onMaterialChipSelected = useCallback((mat) => {
    if (mat in materialsSelected) {
      materialsSelected[mat] = !materialsSelected[mat];
      setMaterialsSelected({ ...materialsSelected });
    }
  }, [materialsSelected]);

  /**------------------------------------------------------------------------------------*
   * List
   *------------------------------------------------------------------------------------*/
  const filterProducts = useCallback((data) => {
    let newData = data.slice();
    // do not filter if no materials selected
    const allFalse = Object.values(materialsSelected).every((value) => value === false);
    if (!allFalse) {
      newData = data.filter((item) =>
      materialsSelected[item.material]
    );
    }
    // if no query, return as we do not want to filter based on ''
    if (!searchQuery) return newData;
    newData = newData.filter(
      (item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return newData;
  }, [searchQuery, materialsSelected]);

  const ListItem = React.memo(({ item, searchQuery, highlightSearchText }) => {
    return (
      <View style={Styles.contFlex}>
        <View style={Styles.contVert}>
          {highlightSearchText(item.name, searchQuery, 'titleSmall')}
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: item.img,
            }}
            resizeMode={'contain'}
          />
          <Text variant='labelMedium'>{`material: ${item.material}`}</Text>
          {highlightSearchText(item.desc, searchQuery, 'bodyMedium')}
        </View>
        <Divider />
      </View>
    );
  });


  const renderItem = useCallback(({ item, index }) => {
    return (
      <ListItem
        item={item}
        searchQuery={searchQuery}
        highlightSearchText={highlightSearchText}
      />
    );
  }, [searchQuery]);

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={Styles.contPage}>
      {/* header and search bar */}
      <Appbar.Header>
        <SearchBarComp
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Appbar.Header>
      {/* filter menu */}
      <Collapsible
        renderHeader={(isCollapsed) => { return <FilterHeader isCollapsed={isCollapsed} /> }}
        renderContent={(isCollapsed) => { return <FilterContent isCollapsed={isCollapsed} /> }}
      />
      {/* <AccordionComp
        sections={[0]}
        renderHeader={renderFilterHeader}
        renderContent={renderFilterContent}
      /> */}
      {/* toggle biglist vs flatlist */}
      <View style={Styles.contVert}>
      <View style={Styles.contPad}>
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