import React, { memo, ReactNode } from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import * as Const from '../Const';

type LayoutProps = {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: number;
  padding?: number;
  navBarScrollAllowance?: boolean;
  backgroundColor?: string;
  children: ReactNode;
};

/******************************************************************************************************************
 * Render a flexible base layout container using flexbox.
 * Supports spacing, padding, wrapping, scrolling, and child reversal.
 * Used via VerticalLayout and HorizontalLayout wrappers rather than standalone.
 *
 * @param props - Layout props:
 *   - direction?: 'row' | 'column'   - Flex direction
 *   - justify?: string               - Flexbox justification along the main axis
 *   - reverse?: boolean              - Whether to render children in reverse order
 *   - constraint?: 'wrap' | 'scroll' | 'none' - Layout constraint mode
 *   - flex?: number      - Flex grow/shrink value for container
 *   - gap?: number       - Spacing between children
 *   - padding?: number   - Padding inside container
 *   - navBarScrollAllowance?: bool   - Allowance for nav bar if layout exceeds bottom of screen space
 *   - backgroundColor?: string       - Background color
 *   - children: ReactNode            - Elements rendered inside
 ******************************************************************************************************************/
const Layout: React.FC<LayoutProps> = ({
  direction = 'column',
  justify = 'flex-start',
  reverse = false,
  constraint = 'none',
  flex = 1,
  gap = Const.padSize,
  padding = Const.padSize,
  navBarScrollAllowance = false,
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
      <ScrollView horizontal={direction === 'row'}>
        <View style={{
          flex, flexWrap, flexDirection: direction, justifyContent: justify, gap, padding, backgroundColor,
          paddingBottom: direction == 'column' && navBarScrollAllowance ? 50 : padding
        }}>
          {content}
        </View>
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
 * Render a layout container with direction defaulted to 'column'.
 * Convenience wrapper for vertical stacking.
 *
 * @param props - inherits all layout props except direction
 *
 * @usage
 * ```tsx
 * <VerticalLayout gap={12}>
 *   <BlockA />
 *   <BlockB />
 * </VerticalLayout>
 * ```
 ******************************************************************************************************************/
export const VerticalLayout: React.FC<Omit<LayoutProps, 'direction'>> =
  memo((props) => <Layout {...props} direction='column' />);

/******************************************************************************************************************
 * Render a layout container with direction defaulted to 'row'.
 * Convenience wrapper for horizontal arrangement.
 *
 * @param props - inherits all layout props except direction
 *
 * @usage
 * ```tsx
 * <HorizontalLayout gap={6}>
 *   <ButtonA />
 *   <ButtonB />
 * </HorizontalLayout>
 * ```
 ******************************************************************************************************************/
export const HorizontalLayout: React.FC<Omit<LayoutProps, 'direction'>> =
  memo((props) => <Layout {...props} direction='row' />);
