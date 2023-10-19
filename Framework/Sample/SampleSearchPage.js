import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Image } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import {
  useTheme, Text, Button, Appbar, Searchbar, Divider,
} from 'react-native-paper';
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
    console.log(JSON.stringify(fakeData[2]));
    console.log("Sample data generated");
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
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  }

  /**------------------------------------------------------------------------------------*
   * List
   *------------------------------------------------------------------------------------*/
  const renderProductItem = ({ item, index }) => {
    return <View style={{ width: '100%' }}>
      <View style={{ width: '100%', height: '100%', padding: padSize05 }}>
        <Text variant="titleSmall">{`${item.name}`}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: item.img,
          }}
          resizeMode={'contain'}
        />
        <Text variant="labelMedium">{`material: ${item.material}`}</Text>
        <Text variant="bodyMedium">{`${item.desc}`}</Text>
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
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </Appbar.Header>
        {productList.length > 0 ? <BigList data={productList} renderItem={renderProductItem} itemHeight={250} /> : null}
      </View>
    </View>
  );
}