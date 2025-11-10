import React, { ReactNode } from 'react';
import { PadSpacingValue } from '../../../Types';

/******************************************************************************************************************
 * @property dir?             - Flex direction
 * @property reverse?         - Whether to render children in reverse order
 * @property constraint?      - Layout constraint mode
 * @property flex?            - Flex grow/shrink value for container
 * @property gap?             - Spacing between and around children
 * @property height?          - Fixed height for the container
 * @property bgColor?         - Background color
 * @property children         - Elements rendered inside
 ******************************************************************************************************************/
export type LayoutProps = {
  dir?: 'row' | 'column';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  gap?: PadSpacingValue;
  height?: number;
  bgColor?: string;
  children: ReactNode;
};

/******************************************************************************************************************
 * A flexible element grouping container that defines structure and spacing for contained elements.
 *  - Does not support custom styling as that is out of scope for layout.
 *  - Use to wrap multiple child UI components.
 * 
 * @param props - Refer to LayoutProps
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
