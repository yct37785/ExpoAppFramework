import React, { useState, JSX, memo, ReactNode } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Const from '../../Const';

export type ToggleHeaderProps = {
  toggleHeaderText: string;
  isCollapsed: boolean;
};

/******************************************************************************************************************
 * Toggle header component
 *
 * Header component used inside collapsible containers and accordions.
 * Displays a label and an arrow icon that flips based on collapse state.
 *
 * @param toggleHeaderText - text label to be displayed in the header
 * @param isCollapsed - whether the collapsible section is currently collapsed
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const ToggleHeader: React.FC<ToggleHeaderProps> = memo(({ toggleHeaderText, isCollapsed }) => {
  const theme = useTheme();
  return (
    <View style={{ padding: Const.padSize, flexDirection: 'row', alignItems: 'center' }}>
      <Text variant="titleSmall">{toggleHeaderText}</Text>
      <View style={{ flex: 1 }} />
      <MaterialIcons
        name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
        size={Const.iconSizeMedium}
        color={theme.colors.onSurface}
      />
    </View>
  );
});

export type CollapsibleContainerProps = {
  toggleHeaderText: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Collapsible container component
 *
 * A self-contained collapsible section.
 * - Renders a clickable header (ToggleHeader) and collapsible children.
 * - Useful for showing/hiding a single block of content.
 *
 * @param toggleHeaderText - text for the toggle header
 * @param style - optional style for the container
 * @param children - content to render inside the collapsible section
 *
 * @returns JSX.Element
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

export type AccordionContainerProps = {
  sectionTitles: string[];
  style?: StyleProp<ViewStyle>;
  children: ReactNode[];
};

/******************************************************************************************************************
 * Accordion container component
 *
 * Accordion component with multiple collapsible sections.
 * - Accepts an array of titles and children
 * - Each child corresponds to a section of the accordion
 * - Only one section can be expanded at a time
 *
 * @param sectionTitles - array of section titles (must match number of children)
 * @param style - optional style for the accordion container
 * @param children - array of children, one per section
 *
 * @returns JSX.Element
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

    /**
     * Renders a header row for each accordion section.
     *
     * @param section - section object containing the title
     * @param i - index of the current section
     *
     * @returns JSX.Element
     */
    function renderHeader(section: { title: string }, i: number): JSX.Element {
      return (
        <View style={{ padding: Const.padSize, alignItems: 'center', flexDirection: 'row' }}>
          <Text variant="titleSmall">{section.title}</Text>
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

    /**
     * Renders the collapsible content for a given section.
     *
     * @param section - section object containing the content
     *
     * @returns JSX.Element
     */
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
