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

export const GridLayout = ({ children, columns = 2 }) => {
  const rows = [];
  let row = [];

  children.forEach((child, index) => {
    row.push(child);
    if ((index + 1) % columns === 0) {
      rows.push(<View key={index} style={{ flexDirection: 'row' }}>{row}</View>);
      row = [];
    }
  });

  if (row.length > 0) {
    rows.push(<View key={children.length} style={{ flexDirection: 'row' }}>{row}</View>);
  }

  return (
    <View style={{ flex: 1 }}>
      {rows}
    </View>
  );
};

export const ScrollLayout = ({ children }) => (
  <ScrollView>
      {children}
  </ScrollView>
);