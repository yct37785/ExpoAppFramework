import React, { useState, useContext, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { padSize05, padSize, padSize2, iconSizeSmall, iconSizeMedium } from '../../Index/Const';
import { Text } from '../Text/Text';

/**
 * ToggleHeader Component
 * 
 * @param {Object} param0 - Component props.
 * @param {boolean} param0.isCollapsed - Indicates if the container is collapsed.
 * 
 * @returns {JSX.Element} The ToggleHeader component.
 */
const ToggleHeader = memo(({ toggleHeaderText = '', isCollapsed }) => {
  const theme = useTheme();
  return (
    <View style={{ padding: padSize, flexDirection: 'row', alignItems: 'center' }}>
      <Text variant='titleSmall'>{toggleHeaderText}</Text>
      <View style={{ flex: 1 }} />
      <MaterialIcons
        name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
        color={theme.colors.text}
        size={iconSizeMedium}
      />
    </View>
  );
});

/**
 * A component that provides a collapsible section.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered within the collapsible section.
 * 
 * @returns {JSX.Element} The CollapsibleContainer component.
 */
export const CollapsibleContainer = memo(({ toggleHeaderText = '', children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <ToggleHeader toggleHeaderText={toggleHeaderText} isCollapsed={isCollapsed} />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </View>
  );
});

/**
 * A component that provides an accordion with multiple collapsible sections.
 * Automatically maps children to sections.
 * 
 * @param {Object} props - Component props.
 * @param {Array<string>} props.sectionTitles - Array of section titles.
 * @param {React.ReactNode[]} props.children - Children components for each section content.
 * 
 * @returns {JSX.Element} The AccordionContainer component.
 */
export const AccordionContainer = memo(({
  sectionTitles,
  children
}) => {
  if (sectionTitles.length !== React.Children.count(children)) {
    throw new Error("The number of section titles must match the number of children.");
  }

  const theme = useTheme();
  const [activeSections, setActiveSections] = useState([]);

  // Combine section titles and children into sections array
  const sections = sectionTitles.map((title, index) => ({
    title,
    content: React.Children.toArray(children)[index],
  }));

  /**
   * Renders header.
   * 
   * @param {Object} section - Section object.
   * @param {number} i - Index of current section.
   * 
   * @returns {JSX.Element} The header component.
   */
  function renderHeader(section, i) {
    return <View style={{ padding: padSize, alignItems: 'center', flexDirection: 'row' }}>
      <Text variant='titleSmall'>{section.title}</Text>
      <View style={{ flex: 1 }} />
      <MaterialIcons
        name={activeSections.length === 1 && activeSections[0] === i ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        color={theme.colors.text}
        size={iconSizeMedium}
      />
    </View>;
  }

  /**
   * Renders content.
   * 
   * @param {Object} section - Section object.
   * 
   * @returns {JSX.Element} The content component.
   */
  function renderContent(section) {
    return <View>
      {section.content}
    </View>;
  }

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={(section, i) => renderHeader(section, i)}
      renderContent={(section) => renderContent(section)}
      onChange={(activeSections) => setActiveSections(activeSections)}
    />
  );
});