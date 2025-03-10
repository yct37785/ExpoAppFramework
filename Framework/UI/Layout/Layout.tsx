import React, { useState, useEffect, memo, ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import { useOnLayout } from '../../Hook/OnLayoutHook';
const _ = require('lodash');

/**
 * @param direction - 'row' or 'column' for flex direction.
 * @param align - 'flex-start' | 'center' | 'flex-end' for alignment.
 * @param reverse - Reverse the order of children.
 * @param constraint - 'wrap' | 'scroll' | 'none' for layout constraint.
 * @param childMargin - Margin between child elements.
 * @param margin - Outer margin for the layout.
 * @param padding - Inner padding for the layout.
 * @param style - Additional custom styles.
 * @param children - Child elements.
 */
export type LayoutProps = {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  childMargin?: number;
  margin?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * base layout component that handles flexible layout
 */
const Layout: React.FC<LayoutProps> = ({
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

  const renderChild = (index: number, child: ReactNode) => {
    return <View style={{ padding: childMargin / 2 }} key={index}>{child}</View>;
  }

  if (constraint === 'scroll') {
    return (
      <View style={[style, { flex: 1 }]}>
        <ScrollView horizontal={direction === 'row'}>
          <View style={containerStyle.container}>
            {arrangedChildren.map((child, index) => renderChild(index, child))}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={style}>
        <View style={containerStyle.container}>
          {arrangedChildren.map((child, index) => renderChild(index, child))}
        </View>
      </View>
    );
  }
};

/**
 * vertical Layout component that inherits from Layout and sets direction to 'column'
 */
export const VerticalLayout: React.FC<Omit<LayoutProps, 'direction'>> = memo((props) => <Layout {...props} direction="column" />);

/**
 * horizontal Layout component that inherits from Layout and sets direction to 'row'
 */
export const HorizontalLayout: React.FC<Omit<LayoutProps, 'direction'>> = memo((props) => <Layout {...props} direction="row" />);

/**
 * @param direction - Layout direction, 'row' or 'column'.
 * @param reverse - Reverse the order of items.
 * @param spacing - Space between grid items.
 * @param itemsPerLine - Number of items per row/column.
 * @param itemStyle - Style for each individual item.
 * @param style - Additional custom styles for the container.
 * @param children - Child elements.
 */
export type GridLayoutProps = {
  direction?: 'row' | 'column';
  reverse?: boolean;
  spacing?: number;
  itemsPerLine?: number;
  itemStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * grid layout component that renders a grid of items with customizable spacing and number of items per row/column
 */
export const GridLayout: React.FC<GridLayoutProps> = memo(({
  direction = 'row',
  reverse = false,
  spacing = 0,
  itemsPerLine = 2,
  itemStyle = {},
  style = {},
  children,
}) => {
  const [size, onLayout] = useOnLayout();
  const arrangedChildren = React.Children.toArray(children).filter(child => React.isValidElement(child));
  if (reverse) {
    arrangedChildren.reverse();
  }

  const containerStyle = StyleSheet.create({
    layout: _.merge({}, { 
      flexDirection: direction === 'row' ? 'row' : 'column', 
      flexWrap: 'wrap' 
    }, style),
    item: _.merge({}, { 
      margin: spacing / 2, 
      width: size ? Math.floor(size.width / itemsPerLine) - spacing : 0 }, 
      itemStyle),
  });

  return (
    <View style={containerStyle.layout} onLayout={onLayout}>
      {arrangedChildren.map((child, index) => (
        <View
          style={containerStyle.item}
          key={index}
        >
          {child}
        </View>
      ))}
    </View>
  );
});
