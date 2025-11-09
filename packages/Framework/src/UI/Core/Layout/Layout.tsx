import React, { memo, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import * as Const from '../../../Const';
import { LayoutType, VerticalLayoutType, HorizontalLayoutType } from './Layout.types';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | 'undefined';

/******************************************************************************************************************
 * Layout implementation (perf-tuned + hooks in stable order)
 ******************************************************************************************************************/
const Layout: LayoutType = ({
  dir = 'column',
  justify = 'flex-start',
  align = 'stretch',
  reverse = false,
  constraint = 'none',
  flex = 1,
  gap = 1,
  height,
  bgColor = 'transparent',
  children,
}) => {
  // reverse only when requested, and memoize so we don't rebuild arrays unnecessarily
  const content = useMemo(
    () => (reverse ? React.Children.toArray(children).reverse() : children),
    [children, reverse]
  );

  // derived flags
  const isRow = dir === 'row';
  const flexWrap: FlexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  const isScroll = constraint === 'scroll';

  // styles computed once per relevant change
  const scrollStyle = useMemo(() => ({ flex, height }), [flex, height]);
  const contentStyle = useMemo(
    () => ({
      flexWrap,
      flexDirection: dir,
      justifyContent: justify,
      alignItems: align,
      gap: gap * Const.padSize,
      padding: gap * Const.padSize,
      backgroundColor: bgColor,
    }),
    [flexWrap, dir, justify, align, gap, bgColor]
  );
  const viewStyle = useMemo(
    () => ({
      flex,
      height,
      flexWrap,
      flexDirection: dir,
      justifyContent: justify,
      alignItems: align,
      gap: gap * Const.padSize,
      padding: gap * Const.padSize,
      backgroundColor: bgColor,
    }),
    [flex, height, flexWrap, dir, justify, align, gap, bgColor]
  );

  // render
  if (isScroll) {
    return (
      <ScrollView
        horizontal={isRow}
        showsVerticalScrollIndicator={!isRow}
        showsHorizontalScrollIndicator={isRow}
        style={scrollStyle}
        contentContainerStyle={contentStyle}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={viewStyle}>{content}</View>;
};

/******************************************************************************************************************
 * VerticalLayout implementation.
 ******************************************************************************************************************/
export const VerticalLayout: VerticalLayoutType = memo((props) => (
  <Layout {...props} dir="column" />
));

/******************************************************************************************************************
 * HorizontalLayout implementation.
 ******************************************************************************************************************/
export const HorizontalLayout: HorizontalLayoutType = memo((props) => (
  <Layout {...props} dir="row" />
));
