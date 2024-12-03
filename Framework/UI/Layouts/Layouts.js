import React, { memo, useContext, useState, useCallback, useEffect } from 'react';
import { useOnLayout } from '../../Hooks/OnLayoutHook';
import { View, StyleSheet, ScrollView } from 'react-native';

/**
 * Base layout component.
 * 
 * @param {Object} props - Component props.
 * @param {'row' | 'column'} [props.direction='column'] - Flex direction.
 * @param {'flex-start' | 'center' | 'flex-end'} [props.align='flex-start'] - Alignment of children.
 * @param {boolean} [props.reverse=false] - Reverse the order of children.
 * @param {'wrap' | 'scroll' | 'none'} [props.constraint='wrap'] - Determine if child elements behaviour if exceeds parent dimensions,
 * none by default, up to user to determine if wrap or scroll.
 * @param {number} [props.childMargin=0] - Margin between child elements.
 * @param {number} [props.margin=0] - Outer margin for the layout.
 * @param {number} [props.padding=0] - Inner padding for the layout.
 * @param {object} [props.style={}] - Additional custom styles for the layout.
 * @param {React.ReactNode} props.children - Child elements.
 * 
 * @returns {JSX.Element} The base Layout component.
 */
const Layout = ({
  direction = 'column',
  align = 'flex-start',
  reverse = false,
  constraint = 'none',
  childMargin = 0,
  margin = 0,
  padding = 0,
  style = {},
  children,
}) => {
  const arrangedChildren = React.Children.toArray(children).filter(child => React.isValidElement(child));
  if (reverse) {
    arrangedChildren.reverse();
  }
  
  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction,
      justifyContent: align,
      flexWrap: constraint === 'wrap' ? 'wrap' : 'nowrap',
      margin,
      padding,
    },
  });

  const renderChild = (index, child) => {
    return <View style={{ padding: childMargin / 2 }} key={index}>{child}</View>
  };
  
  if (constraint === 'scroll') {
    return (
      <View style={style}>
        <ScrollView horizontal={direction === 'row'}>
          <View style={containerStyle.container} horizontal={direction === 'row'}>
            {arrangedChildren.map((child, index) =>
              renderChild(index, child)
            )}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={style}>
        <View style={containerStyle.container}>
          {arrangedChildren.map((child, index) =>
              renderChild(index, child)
          )}
        </View>
      </View>
    );
  }
};

/**
 * Vertical Layout Component.
 */
export const VerticalLayout = memo((props) => <Layout {...props} direction="column" />);

/**
 * Horizontal Layout Component.
 */
export const HorizontalLayout = memo((props) => <Layout {...props} direction="row" />);

/**
 * Grid Layout Component.
 * 
 * @param {Object} props - Component props.
 * @param {'row' | 'column'} [props.direction='row'] - Layout direction.
 * @param {boolean} [props.reverse=false] - Reverse the order of children.
 * @param {number} [props.spacing=0] - Space between grid items.
 * @param {number} [props.itemsPerLine=2] - Number of items per row/column.
 * @param {object} [props.style={}] - Additional custom styles for the grid.
 * @param {React.ReactNode} props.children - Child elements.
 * 
 * @returns {JSX.Element} The Grid Layout component.
 */
export const GridLayout = memo(({
  direction = 'row',
  reverse = false,
  spacing = 0,
  itemsPerLine = 2,
  style = {},
  children,
}) => {
  const [size, onLayout] = useOnLayout();
  const arrangedChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  );
  if (reverse) {
    arrangedChildren.reverse();
  }

  const containerStyle = StyleSheet.create({
    container: {
      flexDirection: direction === 'row' ? 'row' : 'column',
      flexWrap: 'wrap',
      ...style,
    },
  });

  const itemStyle = StyleSheet.create({
    item: {
      backgroundColor: 'yellow',
      margin: spacing / 2,
      width: size ? (size.width / itemsPerLine) - spacing : 0
    },
  });

  return (
    <View style={containerStyle.container} onLayout={onLayout}>
      {arrangedChildren.map((child, index) => (
        <View style={itemStyle.item} key={index}>
          {child}
        </View>
      ))}
    </View>
  );
});