import React, { memo, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import * as Const from '../../../Const';
import { LayoutType, VerticalLayoutType, HorizontalLayoutType } from './Layouts.types';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | 'undefined';

/******************************************************************************************************************
 * Layout implementation (perf-tuned + hooks in stable order)
 ******************************************************************************************************************/
const Layout: LayoutType = ({
  direction = 'column',
  justify = 'flex-start',
  align = 'stretch',
  reverse = false,
  constraint = 'none',
  flex = 1,
  gap = Const.padSize,
  padding = Const.padSize,
  backgroundColor = 'transparent',
  children,
}) => {
  // reverse only when requested, and memoize so we don't rebuild arrays unnecessarily
  const content = useMemo(
    () => (reverse ? React.Children.toArray(children).reverse() : children),
    [children, reverse]
  );

  // derived flags
  const isRow = direction === 'row';
  const flexWrap: FlexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  const isScroll = constraint === 'scroll';

  // styles computed once per relevant change
  const scrollStyle = useMemo(() => ({ flex }), [flex]);
  const contentStyle = useMemo(
    () => ({
      flexWrap,
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap,
      padding,
      backgroundColor,
    }),
    [flexWrap, direction, justify, align, gap, padding, backgroundColor]
  );
  const viewStyle = useMemo(
    () => ({
      flex,
      flexWrap,
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap,
      padding,
      backgroundColor,
    }),
    [flex, flexWrap, direction, justify, align, gap, padding, backgroundColor]
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
  <Layout {...props} direction="column" />
));

/******************************************************************************************************************
 * HorizontalLayout implementation.
 ******************************************************************************************************************/
export const HorizontalLayout: HorizontalLayoutType = memo((props) => (
  <Layout {...props} direction="row" />
));
