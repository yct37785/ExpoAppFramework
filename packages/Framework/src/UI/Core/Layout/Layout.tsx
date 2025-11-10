import React, { memo, useMemo } from 'react';
import { View, ScrollView, ViewStyle, FlexStyle, FlexAlignType } from 'react-native';
import * as Const from '../../../Const';
import { LayoutType, VerticalLayoutType, HorizontalLayoutType } from './Layout.types';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | 'undefined';

// locks flexgrow/shrink when height is set
const lockWhenFixedHeight = (height?: number) =>
  height != null ? { flexGrow: 0, flexShrink: 0 } : {};

/******************************************************************************************************************
 * Layout implementation:
 *  - If neither height nor flex is provided, the layout defaults to flex: 1 and fills available space.
 *  - If a fixed height is provided, the layout will no longer flex unless flex={...} is explicitly specified.
 ******************************************************************************************************************/
const Layout: LayoutType = ({
  dir = 'column',
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

  // derived flags
  const isRow = dir === 'row';
  const isWrap = constraint === 'wrap';
  const isScroll = constraint === 'scroll';
  const flexWrap: FlexWrap = isWrap ? 'wrap' : 'nowrap';

  // do not stretch if isWrap
  const effectiveAlignItems: FlexAlignType = isWrap ? 'flex-start' : 'stretch';

  // honor explicit flex, otherwise only default to flex:1 when not height-bound AND not explicitly wrap
  const appliedFlex = useMemo(() => {
    if (typeof flex === 'number') return flex;
    if (height != null) return undefined;
    return isWrap ? undefined : 1;
  }, [flex, height, isWrap]);

  // outer wrapper (flex/height)
  const containerDims: ViewStyle = useMemo(
    () => ({
      ...(height != null ? { height } : {}),
      ...(appliedFlex != null ? { flex: appliedFlex } : {}),
      ...lockWhenFixedHeight(height),
    }),
    [height, appliedFlex]
  );

  // content style
  const alignContentValue: FlexStyle['alignContent'] = isWrap ? 'flex-start' : undefined;
  const contentStyle: ViewStyle = useMemo(
    () => ({
      flexWrap,
      flexDirection: dir,
      justifyContent: 'flex-start',
      alignItems: effectiveAlignItems,  // controls items within a row
      alignContent: alignContentValue,  // controls how the rows themselves stack and distribute
      gap: gap * Const.padSize,
      padding: gap * Const.padSize,
      backgroundColor: bgColor,
    }),
    [flexWrap, dir, effectiveAlignItems, alignContentValue, gap, bgColor]
  );

  if (isScroll) {
    return (
      <ScrollView
        horizontal={isRow}
        showsVerticalScrollIndicator={!isRow}
        showsHorizontalScrollIndicator={isRow}
        style={containerDims}                 // dimensions on ScrollView
        contentContainerStyle={contentStyle}  // layout rules on inner content
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={[containerDims, contentStyle]}>{content}</View>;
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
