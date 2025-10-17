import React, { ReactNode } from 'react';

/******************************************************************************************************************
 * Layout props.
 * 
 * @property direction?     - Flex direction
 * @property justify?       - Flexbox justification along the main axis
 * @property reverse?       - Whether to render children in reverse order
 * @property constraint?    - Layout constraint mode
 * @property flex?          - Flex grow/shrink value for container
 * @property gap?           - Spacing between children
 * @property padding?       - Padding inside container
 * @property backgroundColor?       - Background color
 * @property children               - Elements rendered inside
 ******************************************************************************************************************/
export type LayoutProps = {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: number;
  padding?: number;
  backgroundColor?: string;
  children: ReactNode;
};

/******************************************************************************************************************
 * Render a flexible base layout container using flexbox.
 * - Supports spacing, padding, wrapping, scrolling, and child reversal.
 * - Used via VerticalLayout and HorizontalLayout wrappers rather than standalone.
 * - Does not support custom styles.
 ******************************************************************************************************************/
export type LayoutType = React.FC<LayoutProps>;

/******************************************************************************************************************
 * Render a layout container with direction defaulted to 'column'.
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
 * Render a layout container with direction defaulted to 'row'.
 * Convenience wrapper for horizontal arrangement.
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
