/*****************************************************************************************
 * collapsible comps
*****************************************************************************************/
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

/**
 * CollapsibleComp Component
 * 
 * A component that provides a collapsible section.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.renderHeader - Function to render the header of the collapsible section.
 * @param {Function} props.renderContent - Function to render the content of the collapsible section.
 * @returns {JSX.Element} The CollapsibleComp component.
 */
export const CollapsibleComp = ({
  renderHeader = () => {},
  renderContent = () => {}
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        {renderHeader(isCollapsed)}
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {renderContent(isCollapsed)}
      </Collapsible>
    </View>
  );
};

/**
 * AccordionComp Component
 * 
 * A component that provides an accordion with multiple collapsible sections.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.sections - Array of sections for the accordion.
 * @param {Function} props.renderSectionTitle - Function to render the section title.
 * @param {Function} props.renderHeader - Function to render the header of each section.
 * @param {Function} props.renderContent - Function to render the content of each section.
 * @returns {JSX.Element} The AccordionComp component.
 */
export const AccordionComp = ({
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
};
