import React, { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { TextProps } from '../Text/Text.types';
import type { IconProps } from '../Text/Icon.types';

/******************************************************************************************************************
 * Shared header option types.
 ******************************************************************************************************************/
export type CollapsibleHeaderTextOptions = Omit<TextProps, 'children'>;
export type CollapsibleHeaderIconOptions = Omit<IconProps, 'source'>;

/******************************************************************************************************************
 * CollapsibleContainer props.
 * 
 * @property text?             - Main header label (preferred)
 * @property textOpts?         - Text styling options for the header label
 * @property icon?             - Optional leading icon in the header
 * @property iconOpts?         - Styling options for the leading icon
 * @property toggleHeaderText? - Deprecated: legacy header label (used if `text` is not provided)
 * @property style?            - Optional container style
 * @property children          - Content rendered inside the collapsible body
 ******************************************************************************************************************/
export type CollapsibleContainerProps = {
  /** preferred header label */
  text?: string;

  /** optional text props (variant, color, numberOfLines, style, …) */
  textOpts?: CollapsibleHeaderTextOptions;

  /** optional leading icon name (passed to UI.Icon) */
  icon?: IconProps['source'];

  /** optional leading icon props (variant, color, size, style, …) */
  iconOpts?: CollapsibleHeaderIconOptions;

  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * A container that can expand or collapse its content vertically, typically used for toggling visibility of sections.
 *
 * @usage
 * ```tsx
 * <CollapsibleContainer text='details'>
 *   <Text>hidden content</Text>
 * </CollapsibleContainer>
 * ```
 ******************************************************************************************************************/
export type CollapsibleContainerType = React.FC<CollapsibleContainerProps>;

/******************************************************************************************************************
 * Accordion section header config.
 *
 * @property text?     - Header label
 * @property textOpts? - Text styling options
 * @property icon?     - Optional leading icon
 * @property iconOpts? - Leading icon styling options
 ******************************************************************************************************************/
export type AccordionSectionHeader = {
  text?: string;
  textOpts?: CollapsibleHeaderTextOptions;
  icon?: IconProps['source'];
  iconOpts?: CollapsibleHeaderIconOptions;
};

/******************************************************************************************************************
 * AccordionContainer props.
 * 
 * @property sections  - Header config for each section in order
 * @property style?    - Optional container style
 * @property children  - Content nodes matched 1:1 with sections
 ******************************************************************************************************************/
export type AccordionContainerProps = {
  sections: AccordionSectionHeader[];
  style?: StyleProp<ViewStyle>;
  children: ReactNode[];
};

/******************************************************************************************************************
 * A vertically stacked set of collapsible panels where only one section can be expanded at a time.
 *
 * @param props - Refer to AccordionContainerProps
 *
 * @throws {Error} when the number of sections does not match the number of children
 *
 * @usage
 * ```tsx
 * <AccordionContainer
 *   sections={[
 *     { text: 'First' },
 *     { text: 'Second', icon: 'star' },
 *   ]}
 * >
 *   <View><Text>a content</Text></View>
 *   <View><Text>b content</Text></View>
 * </AccordionContainer>
 * ```
 ******************************************************************************************************************/
export type AccordionContainerType = React.FC<AccordionContainerProps>;
