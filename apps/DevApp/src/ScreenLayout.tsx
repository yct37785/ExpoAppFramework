import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Switch, useTheme, Text } from 'react-native-paper';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
export const DefaultLeftContent = memo(() => {
  return (<View style={{ flex: 1 }}>
  </View>)
});

/******************************************************************************************************************
 * AppBar: default right content
 ******************************************************************************************************************/
export const DefaultRightContent = memo(() => {
  return (<View style={{ flex: 1 }}>
    <Text>Right content</Text>
  </View>)
});