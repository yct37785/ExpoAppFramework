import React, { useState, useEffect, useCallback, useMemo, memo, ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import { useOnLayout } from '../../Hook/OnLayoutHook';
import Const from '../../Const';
const _ = require('lodash');

/**
 * @param direction - 'row' or 'column' for flex direction.
 * @param align - 'flex-start' | 'center' | 'flex-end' for alignment.
 * @param reverse - Reverse the order of children.
 * @param constraint - 'wrap' | 'scroll' | 'none' for layout constraint.
 * @param gap - Margin between child elements.
 * @param style - Additional custom styles.
 * @param children - Child elements.
 */
type LayoutProps = {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * base layout component, auto space children with padSize gap
 */
const Layout: React.FC<LayoutProps> = ({
  direction = 'column',
  align = 'flex-start',
  reverse = false,
  constraint = 'none',
  gap = Const.padSize,
  style = {},
  children,
}) => {
  const content = reverse ? React.Children.toArray(children).reverse() : children;

  const flexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  if (constraint === "scroll") {
    return (
      <View style={[{ flex: 1 }, style]}>
        <ScrollView horizontal={direction === "row"}>
          <View style={[{ flexWrap, flexDirection: direction, justifyContent: align, gap }]}>
            {content}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[{ flexWrap, flexDirection: direction, justifyContent: align, gap }, style]}>
      {content}
    </View>
  );
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
type GridLayoutProps = {
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

  const arrangedChildren = useMemo(() => {
    let childArray = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child)
    );
    return reverse ? [...childArray].reverse() : childArray;
  }, [children, reverse]);

  const itemWidth = useMemo(() => {
    return size?.width ? Math.floor(size.width / itemsPerLine) - spacing : 0;
  }, [size?.width, itemsPerLine, spacing]);

  return (
    <View
      style={[
        {
          flexDirection: direction === "row" ? "row" : "column",
          flexWrap: "wrap",
        },
        style,
      ]}
      onLayout={onLayout}
    >
      {arrangedChildren.map((child, index) => (
        <View key={index} style={[{ margin: spacing / 2, width: itemWidth }, itemStyle]} >
          {child}
        </View>
      ))}
    </View>
  );
});
