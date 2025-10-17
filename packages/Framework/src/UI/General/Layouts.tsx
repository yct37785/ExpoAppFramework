import React, { memo, ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import * as Const from '../../Const';
import { LayoutType, VerticalLayoutType, HorizontalLayoutType } from './Layouts.types';

/******************************************************************************************************************
 * Layout implementation.
 ******************************************************************************************************************/
const Layout: LayoutType = ({
  direction = 'column',
  justify = 'flex-start',
  reverse = false,
  constraint = 'none',
  flex = 1,
  gap = Const.padSize,
  padding = Const.padSize,
  backgroundColor = 'transparent',
  children,
}) => {
  // reverse children order if requested
  const content = reverse ? React.Children.toArray(children).reverse() : children;

  // determine wrapping mode
  const flexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';

  // if scroll constraint is set, wrap children in a ScrollView
  if (constraint === 'scroll') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        horizontal={direction === 'row'}
        style={{ flex }}  // scrollView should have defined height to calculate scroll
        contentContainerStyle={{
          flexDirection: direction,
          justifyContent: justify,
          flexWrap,
          gap,
          padding,
          backgroundColor,
        }}
      >
        {content}
      </ScrollView>
    );
  }

  // default case: plain flexbox container
  return (
    <View style={{ flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding, backgroundColor }}>
      {content}
    </View>
  );
};

/******************************************************************************************************************
 * VerticalLayout implementation.
 ******************************************************************************************************************/
export const VerticalLayout: VerticalLayoutType =
  memo((props) => <Layout {...props} direction='column' />);

/******************************************************************************************************************
 * HorizontalLayout implementation.
 ******************************************************************************************************************/
export const HorizontalLayout: HorizontalLayoutType =
  memo((props) => <Layout {...props} direction='row' />);
