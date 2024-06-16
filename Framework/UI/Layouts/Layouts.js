import React from 'react';
import { View, ScrollView } from 'react-native';

// Vertical Layout
export const VerticalLayout = ({ children, style, ...props }) => (
  <View style={[{ flexDirection: 'column', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

// Horizontal Layout
export const HorizontalLayout = ({ children, style, ...props }) => (
  <View style={[{ flexDirection: 'row', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

// Grid Layout
export const GridLayout = ({ children, columns = 2, style, ...props }) => {
  const rows = [];
  let row = [];

  React.Children.forEach(children, (child, index) => {
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
    <View style={[{ flex: 1 }, style]} {...props}>
      {rows}
    </View>
  );
};

// Scroll Layout
export const ScrollLayout = ({ children, style, ...props }) => (
  <ScrollView style={[{ flex: 1 }, style]} {...props}>
    {children}
  </ScrollView>
);

// Frame Layout
export const FrameLayout = ({ children, style, ...props }) => (
  <View style={[{ position: 'relative', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

// Relative Layout
export const RelativeLayout = ({ children, style, ...props }) => (
  <View style={[{ position: 'relative', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

// Flex Layout
export const FlexLayout = ({ children, flex = 1, style, ...props }) => (
  <View style={[{ flex }, style]} {...props}>
    {children}
  </View>
);
