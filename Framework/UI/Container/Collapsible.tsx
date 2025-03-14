import React, { useState, useContext, memo, ReactNode } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Const from '../../Const';

/**
 * @param toggleHeaderText - Text to be displayed in the header.
 * @param isCollapsed - Indicates if the container is collapsed.
 */
type ToggleHeaderProps = {
  toggleHeaderText: string;
  isCollapsed: boolean;
}

/**
 * ToggleHeader component
 */
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

/**
 * @param toggleHeaderText - Text for the header.
 * @param style - Additional style on the base container.
 * @param children - Content to be rendered within the collapsible section.
 */
type CollapsibleContainerProps = {
  toggleHeaderText: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * a component that provides a collapsible section
 */
export const CollapsibleContainer: React.FC<CollapsibleContainerProps> = memo(({ toggleHeaderText, style = {}, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <View style={style}>
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
 * @param sectionTitles - Array of section titles.
 * @param style - Additional style on the base container.
 * @param children - Children components for each section content.
 */
type AccordionContainerProps = {
  sectionTitles: string[];
  style?: StyleProp<ViewStyle>;
  children: ReactNode[];
}

/**
 * a component that provides an accordion with multiple collapsible sections
 * - automatically maps children to sections
 */
export const AccordionContainer: React.FC<AccordionContainerProps> = memo(({ sectionTitles, style = {}, children }) => {
  if (sectionTitles.length !== React.Children.count(children)) {
    throw new Error('The number of section titles must match the number of children.');
  }

  const [activeSections, setActiveSections] = useState<number[]>([]);

  // combine section titles and children into sections array
  const sections = sectionTitles.map((title, index) => ({
    title,
    content: React.Children.toArray(children)[index],
  }));

  /**
   * render header
   * 
   * @param section - Section object.
   * @param i - Index of current section.
   */
  function renderHeader(section: { title: string }, i: number): JSX.Element {
    return (
      <View style={{ padding: Const.padSize, alignItems: 'center', flexDirection: 'row' }}>
        <Text variant='titleSmall'>{section.title}</Text>
        <View style={{ flex: 1 }} />
        <MaterialIcons
          name={activeSections.length === 1 && activeSections[0] === i ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={Const.iconSizeMedium}
        />
      </View>
    );
  }

  /**
   * render content
   * 
   * @param section - Section object.
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
      onChange={(activeSections) => setActiveSections(activeSections)}
    />
  );
});