import React, { memo, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import * as Const from '../../../Const';
import { LayoutType, VerticalLayoutType, HorizontalLayoutType } from './Layout.types';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;

/******************************************************************************************************************
 * Layout implementation:
 *  - If neither height nor flex is provided, the layout defaults to flex: 1 and fills available space.
 *  - If a fixed height is provided, the layout will no longer flex unless flex={...} is explicitly specified.
 ******************************************************************************************************************/
const Layout: LayoutType = ({
  dir = 'column',
  justify = 'flex-start',
  align = 'stretch',
  reverse = false,
  constraint = 'none',
  // important: default to undefined so a fixed height isn't overridden by an implicit flex:1
  flex,
  gap = 1,
  height,
  bgColor = 'transparent',
  children,
}) => {
  const content = useMemo(
    () => (reverse ? React.Children.toArray(children).reverse() : children),
    [children, reverse]
  );

  const isRow = dir === 'row';
  const flexWrap: FlexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';
  const isScroll = constraint === 'scroll';

  // apply flex only if explicitly provided, otherwise if no fixed height, expand with flex:1
  const appliedFlex = useMemo(() => {
    if (typeof flex === 'number') return flex;
    return height == null ? 1 : undefined;
  }, [flex, height]);

  // ScrollView's outer wrapper
  const scrollStyle = useMemo(
    () => (height != null ? { height } : appliedFlex != null ? { flex: appliedFlex } : undefined),
    [height, appliedFlex]
  );

  // shared size constraints for the non-scroll container
  const baseContainerDims = useMemo(
    () => ({
      ...(height != null ? { height } : {}),
      ...(appliedFlex != null ? { flex: appliedFlex } : {}),
    }),
    [height, appliedFlex]
  );

  // ScrollView content styles
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

  // view styles for the non-scroll path
  const viewStyle = useMemo(
    () => ({
      ...baseContainerDims,
      ...contentStyle,
    }),
    [baseContainerDims, contentStyle]
  );

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
