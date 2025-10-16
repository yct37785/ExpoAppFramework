import React, { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/******************************************************************************************************************
 * CollapsibleContainer props.
 * 
 * @property toggleHeaderText - Text for the header button
 * @property style?           - Optional container style
 * @property children         - Content rendered inside the collapsible body
 ******************************************************************************************************************/
export type CollapsibleContainerProps = {
  toggleHeaderText: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Provide a self-contained collapsible section with a pressable header and hidden/revealed content.
 *
 * @usage
 * ```tsx
 * <CollapsibleContainer toggleHeaderText='details'>
 *   <Text>hidden content</Text>
 * </CollapsibleContainer>
 * ```
 ******************************************************************************************************************/
export type CollapsibleContainer = React.FC<CollapsibleContainerProps>;

/******************************************************************************************************************
 * AccordionContainer props.
 * 
 * @property sectionTitles  - Titles for each section in order
 * @property style?         - Optional container style
 * @property children       - Content nodes matched 1:1 with sectionTitles
 ******************************************************************************************************************/
export type AccordionContainerProps = {
  sectionTitles: string[];
  style?: StyleProp<ViewStyle>;
  children: ReactNode[];
};

/******************************************************************************************************************
 * Provide a multi-section accordion where only one section is expanded at a time.
 *
 * @param props - Refer to AccordionContainerProps
 *
 * @throws {Error} when the number of section titles does not match the number of children
 *
 * @usage
 * ```tsx
 * <AccordionContainer sectionTitles={['a', 'b']}>
 *   <View><Text>a content</Text></View>
 *   <View><Text>b content</Text></View>
 * </AccordionContainer>
 * ```
 ******************************************************************************************************************/
export type AccordionContainer = React.FC<AccordionContainerProps>;
