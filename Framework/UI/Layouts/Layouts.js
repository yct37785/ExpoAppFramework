import React from 'react';
import { View, Text } from 'react-native';

export const VerticalLayout = ({ children }) => (
  <View style={{ flexDirection: 'column', flex: 1 }}>
    {children}
  </View>
);

export const HorizontalLayout = ({ children }) => (
  <View style={{ flexDirection: 'row', flex: 1 }}>
    {children}
  </View>
);