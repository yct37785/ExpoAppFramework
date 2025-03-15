import React, { useState, useEffect, useCallback, useMemo, memo, ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import { useOnLayout } from '../../Hook/OnLayoutHook';
import Const from '../../Const';
const _ = require('lodash');

/**
 * @param direction - For flex direction.
 * @param justify - For alignment along direction.
 * @param reverse - Reverse the order of children.
 * @param constraint - For layout constraint.
 * @param flex - Container flex property.
 * @param gap - Margin between child elements.
 * @param padding - Padding wrapping child elements.
 * @param style - Additional custom styles.
 * @param children - Child elements.
 */
type LayoutProps = {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * base layout component, auto space children with padSize gap
 */
const Layout: React.FC<LayoutProps> = ({
  direction = 'column',
  justify = 'flex-start',
  reverse = false,
  constraint = 'none',
  flex = 1,
  gap = Const.padSize,
  padding = Const.padSize,
  style = {},
  children,
}) => {
  const content = reverse ? React.Children.toArray(children).reverse() : children;

  const flexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  if (constraint === "scroll") {
    return (
        <ScrollView horizontal={direction === "row"}>
          <View style={[{ flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding }, style]}>
            {content}
          </View>
        </ScrollView>
    );
  }

  return (
    <View style={[{ flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding }, style]}>
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