import React, { memo, ReactNode } from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import * as Const from '../const';

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
};

/******************************************************************************************************************
 * Layout component
 *
 * A flexible base layout component that arranges its children using flexbox.
 * It automatically applies spacing (`gap`) and padding, and supports constraints
 * such as wrapping or scrollable containers.
 *
 * @param direction? - flex direction (`row` | `column`)
 * @param justify? - flexbox justification along the main axis
 * @param reverse? - whether to render children in reverse order
 * @param constraint? - layout constraint mode ('wrap', 'scroll', or 'none')
 * @param flex? - flex grow/shrink value for container
 * @param gap? - spacing between children
 * @param padding? - padding inside container
 * @param style? - additional container style
 * @param children - elements to render inside the layout
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
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
  // reverse children order if requested
  const content = reverse ? React.Children.toArray(children).reverse() : children;

  // determine wrapping mode
  const flexWrap = constraint === 'wrap' ? 'wrap' : 'nowrap';

  // if scroll constraint is set, wrap children in a ScrollView
  if (constraint === 'scroll') {
    return (
      <ScrollView horizontal={direction === 'row'}>
        <View style={[{ flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding }, style]}>
          {content}
        </View>
      </ScrollView>
    );
  }

  // default case: plain flexbox container
  return (
    <View style={[{ flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding }, style]}>
      {content}
    </View>
  );
};

/******************************************************************************************************************
 * Vertical layout component
 *
 * A convenience wrapper for Layout that defaults the direction to 'column'.
 * Useful for vertically stacked children without needing to pass `direction="column"`.
 *
 * @param props - inherits all LayoutProps except direction
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const VerticalLayout: React.FC<Omit<LayoutProps, 'direction'>> =
  memo((props) => <Layout {...props} direction="column" />);

/******************************************************************************************************************
 * Horizontal layout component
 *
 * A convenience wrapper for Layout that defaults the direction to 'row'.
 * Useful for horizontally arranged children without needing to pass `direction="row"`.
 *
 * @param props - inherits all LayoutProps except direction
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const HorizontalLayout: React.FC<Omit<LayoutProps, 'direction'>> =
  memo((props) => <Layout {...props} direction="row" />);
