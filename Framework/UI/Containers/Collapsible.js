/*****************************************************************************************
 * collapsible type containers
*****************************************************************************************/
import React, { useState, useContext, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { LocalDataContext } from '../../Contexts/LocalDataContext';
import { padSize05, padSize, padSize2, iconSizeSmall } from '../../Index/CommonVals';

/**
   * ToggleHeader Component
   * 
   * @param {Object} param0 - Component props.
   * @param {boolean} param0.isCollapsed - Indicates if the container is collapsed.
   * @returns {JSX.Element} The ToggleHeader component.
   */
const ToggleHeader = React.memo(({ toggleHeaderText = '', isCollapsed }) => {
  const theme = useTheme();
  return (
    <View style={{ padding: padSize, paddingLeft: padSize2, flexDirection: 'row', alignItems: 'center' }}>
      <Text>{toggleHeaderText}</Text>
      <MaterialIcons
        name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
        color={theme.colors.text}
        size={iconSizeSmall}
        style={{ paddingLeft: padSize05 }}
      />
    </View>
  );
});

/**
 * A component that provides a collapsible section.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered within the collapsible section.
 * @returns {JSX.Element} The CollapsibleContainer component.
 */
const CollapsibleContainer = ({ toggleHeaderText = '', children }) => {
  const { debugMode } = useContext(LocalDataContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={{ backgroundColor: debugMode ? '#ff99ff' : 'transparent' }}>
      <TouchableOpacity onPress={toggleCollapse}>
        <ToggleHeader toggleHeaderText={toggleHeaderText} isCollapsed={isCollapsed} />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </View>
  );
};

/**
 * A component that provides an accordion with multiple collapsible sections.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.sections - Array of sections for the accordion.
 * @param {Function} props.renderSectionTitle - Function to render the section title.
 * @param {Function} props.renderHeader - Function to render the header of each section.
 * @param {Function} props.renderContent - Function to render the content of each section.
 * @returns {JSX.Element} The AccordionContainer component.
 */
const AccordionContainer = ({
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

export const CollapsibleContainerMemo = memo(CollapsibleContainer);
export const AccordionContainerMemo = memo(AccordionContainer);