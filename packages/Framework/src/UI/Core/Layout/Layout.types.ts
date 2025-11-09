/******************************************************************************************************************
 * Layout component: A flexible element grouping container that defines structure and 
 * spacing for contained elements.
 ******************************************************************************************************************/
import React, { ReactNode } from 'react';
import { type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * @property dir?             - Flex direction
 * @property justify?         - Flexbox children justification along the main axis
 * @property align?           - Flexbox children alignment along the cross axis
 * @property reverse?         - Whether to render children in reverse order
 * @property constraint?      - Layout constraint mode
 * @property flex?            - Flex grow/shrink value for container
 * @property gap?             - Spacing between children
 * @property padding?         - Padding inside container
 * @property backgroundColor? - Background color
 * @property children         - Elements rendered inside
 ******************************************************************************************************************/
export type LayoutProps = {
  dir?: 'row' | 'column';
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: number;
  padding?: number;
  backgroundColor?: string;
  children: ReactNode;
};

export type LayoutType = React.FC<LayoutProps>;

/******************************************************************************************************************
 * Convenience wrapper for vertical stacking.
 *
 * @usage
 * ```tsx
 * <VerticalLayout gap={12}>
 *   <BlockA />
 *   <BlockB />
 * </VerticalLayout>
 * ```
 ******************************************************************************************************************/
export type VerticalLayoutType = React.FC<Omit<LayoutProps, 'direction'>>;

/******************************************************************************************************************
 * Convenience wrapper for horizontal stacking.
 *
 * @usage
 * ```tsx
 * <HorizontalLayout gap={6}>
 *   <ButtonA />
 *   <ButtonB />
 * </HorizontalLayout>
 * ```
 ******************************************************************************************************************/
export type HorizontalLayoutType = React.FC<Omit<LayoutProps, 'direction'>>;
