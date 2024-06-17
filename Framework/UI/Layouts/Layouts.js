import React from 'react';
import { View, ScrollView } from 'react-native';

/**
 * Arranges children vertically.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The VerticalLayout component.
 */
export const VerticalLayout = ({ children, style, ...props }) => (
  <View style={[{ flexDirection: 'column', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

/**
 * Arranges children horizontally.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The HorizontalLayout component.
 */
export const HorizontalLayout = ({ children, style, ...props }) => (
  <View style={[{ flexDirection: 'row', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

/**
 * Arranges children in a grid layout.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.columns - Number of columns in the grid.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The GridLayout component.
 */
export const GridLayout = ({ children, columns = 2, style, ...props }) => {
  const rows = [];
  let row = [];

  React.Children.forEach((child, index) => {
    row.push(
      <View key={`col-${index}`} style={{ flex: 1 }}>
        {child}
      </View>
    );
    if ((index + 1) % columns === 0) {
      rows.push(
        <View key={`row-${Math.floor(index / columns)}`} style={{ flexDirection: 'row', flex: 1 }}>
          {row}
        </View>
      );
      row = [];
    }
  });

  if (row.length > 0) {
    rows.push(
      <View key={`row-${rows.length}`} style={{ flexDirection: 'row', flex: 1 }}>
        {row}
      </View>
    );
  }

  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      {rows}
    </View>
  );
};

/**
 * Makes children scrollable.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The ScrollLayout component.
 */
export const ScrollLayout = ({ children, style, ...props }) => (
  <ScrollView style={[{ flex: 1 }, style]} {...props}>
    {children}
  </ScrollView>
);

/**
 * Stacks children on top of each other.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The FrameLayout component.
 */
export const FrameLayout = ({ children, style, ...props }) => (
  <View style={[{ position: 'relative', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

/**
 * Positions children relative to each other or to the parent layout.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The RelativeLayout component.
 */
export const RelativeLayout = ({ children, style, ...props }) => (
  <View style={[{ position: 'relative', flex: 1 }, style]} {...props}>
    {children}
  </View>
);

/**
 * Allows flexible sizing of children.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @param {number} props.flex - Flex value to determine space occupied relative to siblings.
 * @param {Object} props.style - Custom styles to apply to the layout.
 * @returns {JSX.Element} The FlexLayout component.
 */
export const FlexLayout = ({ children, flex = 1, style, ...props }) => (
  <View style={[{ flex }, style]} {...props}>
    {children}
  </View>
);
