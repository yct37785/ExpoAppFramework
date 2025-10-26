import React, { ReactNode } from 'react';

export type FlexJustifyProperties = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlignProperties = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

/******************************************************************************************************************
 * Layout props.
 * 
 * @property direction?       - Flex direction
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
  direction?: 'row' | 'column';
  justify?: FlexJustifyProperties;
  align?: FlexAlignProperties;
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: number;
  padding?: number;
  backgroundColor?: string;
  children: ReactNode;
};

/******************************************************************************************************************
 * A flexible base layout wrapper that defines structure and spacing for contained elements:
 * - Used via VerticalLayout and HorizontalLayout wrappers rather than standalone.
 * - Does not support custom styles.
 ******************************************************************************************************************/
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
