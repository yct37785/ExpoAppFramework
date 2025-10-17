import React, { useState, JSX, memo, ReactNode, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Icon } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Const from '../../Const';
import { CollapsibleContainerType, AccordionContainerType } from './Collapsible.types';
import { Touchable } from '../Interactive/Touchable';

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
      <Icon
        source={isCollapsed ? 'chevron-down' : 'chevron-up'}
        size={Const.iconSizeMedium}
        color={theme.colors.onSurface}
      />
    </View>
  );
});

/******************************************************************************************************************
 * CollapsibleContainer implementation.
 ******************************************************************************************************************/
export const CollapsibleContainer: CollapsibleContainerType = memo(
  ({ toggleHeaderText, style = {}, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    /**
     * Toggles the collapsed state when the header is pressed.
     */
    const toggleCollapse = useCallback(() => {
      setIsCollapsed(prev => !prev);
    }, []);

    return (
      <View style={style}>
        <Touchable pressOpacity={Const.pressOpacityHeavy} onPress={toggleCollapse}>
          <ToggleHeader toggleHeaderText={toggleHeaderText} isCollapsed={isCollapsed} />
        </Touchable>
        <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      </View>
    );
  }
);

/******************************************************************************************************************
 * Accordion section props.
 * 
 * @property title    - Section title
 * @property content  - Section content
 ******************************************************************************************************************/
type Section = { title: string; content: React.ReactNode };

/******************************************************************************************************************
 * AccordionContainer implementation.
 ******************************************************************************************************************/
export const AccordionContainer: AccordionContainerType = memo(
  ({ sectionTitles, style = {}, children }) => {
    const theme = useTheme();

    const childArray = useMemo(() => React.Children.toArray(children), [children]);
    if (sectionTitles.length !== childArray.length) {
      throw new Error('The number of section titles must match the number of children.');
    }

    // combine titles and children into sections (stable across renders)
    const sections = useMemo<Section[]>(
      () => sectionTitles.map((title, i) => ({ title, content: childArray[i] })),
      [sectionTitles, childArray]
    );

    const [activeSections, setActiveSections] = useState<number[]>([]);

    /**
     * Render the header row for an accordion section, including a chevron that reflects open state.
     *
     * @param section - Object with the section title
     * @param i       - Index of the current section
     * @param isActive- Whether the section is currently open
     *
     * @return - JSX element for the section header
     */
    const renderHeader = useCallback(
      (section: Section, i: number, isActive: boolean): JSX.Element => {
        return (
          <View style={{ padding: Const.padSize, alignItems: 'center', flexDirection: 'row' }}>
            <Text variant='titleSmall' numberOfLines={1}>
              {section.title}
            </Text>
            <View style={{ flex: 1 }} />
            <Icon
              source={isActive ? 'chevron-up' : 'chevron-down'}
              size={Const.iconSizeMedium}
              color={theme.colors.onSurface}
            />
          </View>
        );
      },
      [theme.colors.onSurface]
    );

    /**
     * Render the collapsible body for an accordion section.
     *
     * @param section - Object with a content react node
     *
     * @return - JSX element for the section content
     */
    const renderContent = useCallback(
      (section: Section): JSX.Element => {
        return <View>{section.content}</View>;
      },
      []
    );

    return (
      <Accordion
        containerStyle={style}
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
      />
    );
  }
);
