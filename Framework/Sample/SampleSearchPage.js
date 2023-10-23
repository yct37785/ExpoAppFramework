import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, RadioButton
} from 'react-native-paper';
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
   * List
   *------------------------------------------------------------------------------------*/
  const queryProducts = (data) => {
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
      {/* main content here */}
      <View style={{ width: '100%', flex: 1, padding: padSize }}>
        <Appbar.Header>
          <SearchBarComp
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </Appbar.Header>
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
        {listType == 'biglist' ? <SearchableBigListComp
          data={productList}
          queryFunction={queryProducts}
          rowHeight={ROW_HEIGHT}
          renderItem={renderItem}
        /> : null}
        {listType == 'flatlist' ? <SearchableFlatListComp
          data={productList}
          queryFunction={queryProducts}
          renderItem={renderItem}
        /> : null}
      </View>
    </View>
  );
}