import React, { useState, JSX, memo, ReactNode } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Const from '../../Const';

/******************************************************************************************************************
 * ToggleHeader props.
 * 
 * @property toggleHeaderText - Text label displayed in the header
 * @property isCollapsed      - Whether the section is currently collapsed
 ******************************************************************************************************************/
export type ToggleHeaderProps = {
  toggleHeaderText: string;
  isCollapsed: boolean;
};

/******************************************************************************************************************
 * Render a compact header with a title and a chevron that reflects collapse state.
 *
 * @param props - Refer to ToggleHeaderProps
 *
 * @usage
 * ```tsx
 * <ToggleHeader toggleHeaderText='advanced' isCollapsed />
 * ```
 ******************************************************************************************************************/
export const ToggleHeader: React.FC<ToggleHeaderProps> = memo(({ toggleHeaderText, isCollapsed }) => {
  const theme = useTheme();
  return (
    <View style={{ padding: Const.padSize, flexDirection: 'row', alignItems: 'center' }}>
      <Text variant='titleSmall'>{toggleHeaderText}</Text>
      <View style={{ flex: 1 }} />
      <MaterialIcons
        name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
        size={Const.iconSizeMedium}
        color={theme.colors.onSurface}
      />
    </View>
  );
});

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
 * @param props - Refer to CollapsibleContainerProps
 *
 * @usage
 * ```tsx
 * <CollapsibleContainer toggleHeaderText='details'>
 *   <Text>hidden content</Text>
 * </CollapsibleContainer>
 * ```
 ******************************************************************************************************************/
export const CollapsibleContainer: React.FC<CollapsibleContainerProps> = memo(
  ({ toggleHeaderText, style = {}, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    /**
     * Toggles the collapsed state when the header is pressed.
     */
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <View style={style}>
        <TouchableOpacity onPress={toggleCollapse}>
          <ToggleHeader toggleHeaderText={toggleHeaderText} isCollapsed={isCollapsed} />
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      </View>
    );
  }
);

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
export const AccordionContainer: React.FC<AccordionContainerProps> = memo(
  ({ sectionTitles, style = {}, children }) => {
    if (sectionTitles.length !== React.Children.count(children)) {
      throw new Error('The number of section titles must match the number of children.');
    }

    const [activeSections, setActiveSections] = useState<number[]>([]);

    // combine titles and children into sections
    const sections = sectionTitles.map((title, index) => ({
      title,
      content: React.Children.toArray(children)[index],
    }));

    /**************************************************************************************************************
     * Render the header row for an accordion section, including a chevron that reflects open state.
     *
     * @param section - Object with the section title
     * @param i       - Index of the current section
     *
     * @return - JSX element for the section header
     **************************************************************************************************************/
    function renderHeader(section: { title: string }, i: number): JSX.Element {
      return (
        <View style={{ padding: Const.padSize, alignItems: 'center', flexDirection: 'row' }}>
          <Text variant='titleSmall'>{section.title}</Text>
          <View style={{ flex: 1 }} />
          <MaterialIcons
            name={
              activeSections.length === 1 && activeSections[0] === i
                ? 'keyboard-arrow-up'
                : 'keyboard-arrow-down'
            }
            size={Const.iconSizeMedium}
          />
        </View>
      );
    }

    /**************************************************************************************************************
     * Render the collapsible body for an accordion section.
     *
     * @param section - Object with a content react node
     *
     * @return - JSX element for the section content
     **************************************************************************************************************/
    function renderContent(section: { content: ReactNode }): JSX.Element {
      return <View>{section.content}</View>;
    }

    return (
      <Accordion
        containerStyle={style}
        sections={sections}
        activeSections={activeSections}
        renderHeader={(section, i) => renderHeader(section, i)}
        renderContent={(section) => renderContent(section)}
        onChange={(active) => setActiveSections(active)}
      />
    );
  }
);
