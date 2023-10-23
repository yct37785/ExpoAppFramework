import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Divider,
} from 'react-native-paper';
import { SearchBarComp, highlightSearchText } from '../UI/SearchBar';
import BigList from 'react-native-big-list';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
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
   * Search
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    const filteredProducts = searchQuery
      ? productList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.material.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : productList;
    setFilteredProductList(filteredProducts);
  }, [searchQuery, productList]);

  /**------------------------------------------------------------------------------------*
   * List
   *------------------------------------------------------------------------------------*/
  const renderItemBiglist = ({ item, index }) => {
    return <View style={{ width: '100%' }}>
      <View style={{ width: '100%', height: '100%', padding: padSize05 }}>
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
        {filteredProductList.length > 0 ? <BigList data={filteredProductList} renderItem={renderItemBiglist} itemHeight={ROW_HEIGHT} /> : null}
      </View>
    </View>
  );
}