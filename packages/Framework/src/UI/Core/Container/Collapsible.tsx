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
export const ToggleHeader: React.FC<ToggleHeaderProps> = memo(
  ({ toggleHeaderText, isCollapsed }) => {
    const theme = useTheme();
    return (
      <View style={styles.toggleHeaderRow}>
        <Text variant="titleSmall">{toggleHeaderText}</Text>
        <View style={styles.flexSpacer} />
        <Icon
          source={isCollapsed ? 'chevron-down' : 'chevron-up'}
          size={Const.iconSizeMedium}
          color={theme.colors.onSurface}
        />
      </View>
    );
  }
);

/******************************************************************************************************************
 * CollapsibleContainer implementation.
 ******************************************************************************************************************/
export const CollapsibleContainer: CollapsibleContainerType = memo(
  ({ toggleHeaderText, style, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    /**
     * Toggles the collapsed state when the header is pressed.
     */
    const toggleCollapse = () => {
      setIsCollapsed(prev => !prev);
    };

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
 * AccordionContainer implementation.
 ******************************************************************************************************************/
type Section = { title: string; content: React.ReactNode };

const GRP_SIZE = 3;

/******************************************************************************************************************
 * AccordionGroup:
 * - renders one Accordion component
 ******************************************************************************************************************/
const AccordionGroup = React.memo(function AccordionGroup({
  sections,
  idx,
  closeTrigger,
  onTrigger,
}: {
  sections: Section[];
  idx: number;
  closeTrigger: number;
  onTrigger: (idx: number, sameSection: boolean) => void;
}) {
  const theme = useTheme();
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

  // close on receiving trigger
  useEffect(() => {
    setActiveSections([]);
  }, [closeTrigger]);

  const renderHeader = (section: Section, _i: number, isActive: boolean) => (
    <View style={styles.headerRow}>
      <Text variant="titleSmall" numberOfLines={1}>
        {section.title}
      </Text>
      <View style={styles.flexSpacer} />
      <Icon
        source={isActive ? 'chevron-up' : 'chevron-down'}
        size={Const.iconSizeMedium}
        color={theme.colors.onSurface}
      />
    </View>
  );

  const renderContent = (section: Section, _i: number, isActive: boolean) => (
    <KeepMountedDuringClose active={isActive} durationMs={Const.animDuration}>
      <View>{section.content}</View>
    </KeepMountedDuringClose>
  );

  const onChange = (newActiveSections: number[]) => {
    setActiveSections(prevActive => {
      let sameSection = false;
      if (prevActive.length > 0 && newActiveSections.length > 0) {
        sameSection = prevActive[0] === newActiveSections[0];
      }
      onTrigger(idx, sameSection);
      return newActiveSections;
    });
  };

  return (
    <Accordion
      touchableComponent={Touchable}
      touchableProps={{ pressOpacity: Const.pressOpacityHeavy }}
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={onChange}
      expandMultiple={false}
      renderAsFlatList={false}
      duration={Const.animDuration}
    />
  );
});

/******************************************************************************************************************
 * AccordionContainer:
 * - renders multiple AccordionGroup components
 ******************************************************************************************************************/
export const AccordionContainer: AccordionContainerType = React.memo(function AccordionContainer({
  sectionTitles,
  style,
  children,
}) {
  const childArray = React.Children.toArray(children);

  const sections: Section[] = sectionTitles.map((title, i) => ({
    title,
    content: childArray[i],
  }));

  const groups: Section[][] = [];
  for (let i = 0; i < sections.length; i += GRP_SIZE) {
    groups.push(sections.slice(i, i + GRP_SIZE));
  }

  // Accordion triggers
  const [triggerCloseTrackers, setTriggerCloseTrackers] = useState<number[]>(
    () => groups.map(() => 0)
  );
  const openAccordionIdx = useRef(-1);

  const onTrigger = useCallback(
    (idx: number, sameSection: boolean) => {
      let prev = -1;

      // close current accordion (same group + same section)
      if (openAccordionIdx.current === idx && sameSection) {
        prev = openAccordionIdx.current;
        openAccordionIdx.current = -1;
      }
      // open a different accordion group
      else if (openAccordionIdx.current !== idx) {
        prev = openAccordionIdx.current; // -1 if no previous group
        openAccordionIdx.current = idx;
      }

      // close previously open accordion group
      if (prev !== -1) {
        setTriggerCloseTrackers(prevTrackers => {
          const updated = [...prevTrackers];
          updated[prev] = updated[prev] + 1;
          return updated;
        });
      }
    },
    []
  );

  return (
    <View style={style}>
      {groups.map((g, gi) => (
        <AccordionGroup
          key={`acc-${gi}`}
          idx={gi}
          sections={g}
          closeTrigger={triggerCloseTrackers[gi]}
          onTrigger={onTrigger}
        />
      ))}
    </View>
  );
});

/******************************************************************************************************************
 * styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  toggleHeaderRow: {
    padding: Const.padSize,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexSpacer: {
    flex: 1,
  },
  headerRow: {
    padding: Const.padSize,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
