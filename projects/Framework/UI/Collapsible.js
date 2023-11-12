import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { borderRad, padSize05, padSize, padSize2, padSize4 } from '../Common/Values';
// UI
import {
  useTheme, Text, Button, Appbar, Divider, RadioButton, IconButton
} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

/**
 * 
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
 * accordion component
 * @param sections: arr of objects, each with any properties you want
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