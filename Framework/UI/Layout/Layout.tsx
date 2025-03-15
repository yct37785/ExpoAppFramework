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
 * @param padding - Padding wrapping child elements.
 * @param style - Additional custom styles.
 * @param children - Child elements.
 */
type LayoutProps = {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
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
  align = 'flex-start',
  reverse = false,
  constraint = 'none',
  gap = Const.padSize,
  padding = Const.padSize,
  style = {},
  children,
}) => {
  const content = reverse ? React.Children.toArray(children).reverse() : children;

  const flexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  if (constraint === "scroll") {
    return (
      <View style={[{ flex: 1 }, style]}>
        <ScrollView horizontal={direction === "row"}>
          <View style={[{ flexWrap, flexDirection: direction, justifyContent: align, gap, padding }]}>
            {content}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[{ flex: 1, flexWrap, flexDirection: direction, justifyContent: align, gap, padding }, style]}>
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