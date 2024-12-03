/*****************************************************************************************
 * collapsible type containers
*****************************************************************************************/
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
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.sections - Array of sections for the accordion.
 * @param {Function} props.renderSectionTitle - Function to render the section title.
 * @param {Function} props.renderHeader - Function to render the header of each section.
 * @param {Function} props.renderContent - Function to render the content of each section.
 * 
 * @returns {JSX.Element} The AccordionContainer component.
 */
export const AccordionContainer = memo(({
  sections,
  renderSectionTitle = () => {},
  renderHeader = () => {},
  renderContent = () => {}
}) => {
  const [activeSections, setActiveSections] = useState([]);

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderSectionTitle={(section) => renderSectionTitle(section)}
      renderHeader={(section) => renderHeader(section)}
      renderContent={(section) => renderContent(section)}
      onChange={(activeSections) => setActiveSections(activeSections)}
    />
  );
});