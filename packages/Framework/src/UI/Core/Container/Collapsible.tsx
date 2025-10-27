import React, { useState, JSX, memo, ReactNode, useMemo, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Icon } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Const from '../../../Const';
import { CollapsibleContainerType, AccordionContainerType } from './Collapsible.types';
import { Touchable } from '../Interactive/Touchable';

/******************************************************************************************************************
 * Utility component that keeps its children mounted until a specified timeout elapses after becoming inactive.
 * 
 * @param active      - Whether the content should be considered active (visible)
 * @param durationMs  - Duration (in milliseconds) to keep the children mounted after `active` becomes false
 * @param children    - The React node(s) to render while mounted
 ******************************************************************************************************************/
const KeepMountedDuringClose: React.FC<{
  active: boolean;
  durationMs: number;
  children: React.ReactNode;
}> = ({ active, durationMs, children }) => {
  const [render, setRender] = useState(active);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // if becoming active: show immediately and cancel any pending unmount
    if (active) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setRender(true);
      return;
    }
    // if becoming inactive: wait for the close animation to finish, then unmount
    timerRef.current = setTimeout(() => setRender(false), durationMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, durationMs]);

  return render ? <>{children}</> : null;
};

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
const GRP_SIZE = 3;

// child: one independent accordion group, local state, memoized
const AccordionGroup = React.memo(function AccordionGroup({
  sections,
}: {
  sections: { key: string; title: string; content: React.ReactNode }[];
}) {
  const theme = useTheme();
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

  const renderHeader = React.useCallback(
    (section: { title: string }, _i: number, isActive: boolean) => (
      <View style={styles.headerRow}>
        <Text variant='titleSmall' numberOfLines={1}>{section.title}</Text>
        <View style={{ flex: 1 }} />
        <Icon
          source={isActive ? 'chevron-up' : 'chevron-down'}
          size={Const.iconSizeMedium}
          color={theme.colors.onSurface}
        />
      </View>
    ),
    []
  );

  const renderContent = React.useCallback(
    (section: Section, _i: number, isActive: boolean) => (
      <KeepMountedDuringClose active={isActive} durationMs={Const.animDuration}>
        <View>{section.content}</View>
      </KeepMountedDuringClose>
    ),
    []
  );

  return (
    <Accordion
      touchableComponent={Touchable}
      touchableProps={{ pressOpacity: Const.pressOpacityHeavy }}
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSections}
      expandMultiple={false}
      renderAsFlatList={false}
      duration={Const.animDuration}
    />
  );
});

// parent: split into groups, but render each as a separate child component
export const AccordionContainer: AccordionContainerType = React.memo(function AccordionContainer({
  sectionTitles,
  style = {},
  children
}) {
  const childArray = React.useMemo(() => React.Children.toArray(children), [children]);

  const sections = React.useMemo(
    () => sectionTitles.map((title, i) => ({ key: `${title}-${i}`, title, content: childArray[i] })),
    [sectionTitles, childArray]
  );

  const groups = React.useMemo(() => {
    const out: typeof sections[] = [];
    for (let i = 0; i < sections.length; i += GRP_SIZE) out.push(sections.slice(i, i + GRP_SIZE));
    return out;
  }, [sections]);

  return (
    <View style={style}>
      {groups.map((g, gi) => (
        <AccordionGroup
          key={`acc-${gi}`}
          sections={g}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  headerRow: { padding: Const.padSize, alignItems: 'center', flexDirection: 'row' },
});
