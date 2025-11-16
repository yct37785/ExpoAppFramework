import React, {
  useState,
  memo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Const from '../../../Const';
import {
  CollapsibleContainerType,
  AccordionContainerType,
  AccordionSectionHeader,
} from './Collapsible.types';
import { Touchable } from '../Interactive/Touchable';
import { Text } from '../Text/Text';
import { Icon } from '../Text/Icon';
import type { TextProps } from '../Text/Text.types';
import type { IconProps } from '../Text/Icon.types';

/******************************************************************************************************************
 * Utility component that keeps its children mounted until a specified timeout elapses after becoming inactive.
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
 * @property text        - Text label displayed in the header
 * @property textOpts    - Text styling options
 * @property icon        - Optional leading icon
 * @property iconOpts    - Leading icon styling options
 * @property isCollapsed - Whether the section is currently collapsed
 ******************************************************************************************************************/
export type ToggleHeaderProps = {
  text?: string;
  textOpts?: Omit<TextProps, 'children'>;
  icon?: IconProps['source'];
  iconOpts?: Omit<IconProps, 'source'>;
  isCollapsed: boolean;
};

/******************************************************************************************************************
 * Render a compact header with optional icon + title and a chevron that reflects collapse state.
 ******************************************************************************************************************/
export const ToggleHeader: React.FC<ToggleHeaderProps> = memo(
  ({ text, textOpts, icon, iconOpts, isCollapsed }) => {
    const theme = useTheme();

    return (
      <View style={styles.toggleHeaderRow}>
        {icon ? (
          <Icon
            source={icon}
            size={Const.iconSizeMedium}
            customColor={theme.colors.onSurface}
            style={{ marginRight: Const.padSize2 }}
            {...iconOpts}
          />
        ) : null}

        {text ? (
          <Text variant="titleSmall" {...textOpts}>
            {text}
          </Text>
        ) : null}

        <View style={styles.flexSpacer} />

        <Icon
          source={isCollapsed ? 'chevron-down' : 'chevron-up'}
          size={Const.iconSizeMedium}
          customColor={theme.colors.onSurface}
        />
      </View>
    );
  }
);

/******************************************************************************************************************
 * CollapsibleContainer implementation.
 ******************************************************************************************************************/
export const CollapsibleContainer: CollapsibleContainerType = memo(
  ({ text, textOpts, icon, iconOpts, style, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(prev => !prev);
    };

    return (
      <View style={style}>
        <Touchable pressOpacity={Const.pressOpacityHeavy} onPress={toggleCollapse}>
          <ToggleHeader
            text={text}
            textOpts={textOpts}
            icon={icon}
            iconOpts={iconOpts}
            isCollapsed={isCollapsed}
          />
        </Touchable>
        <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      </View>
    );
  }
);

/******************************************************************************************************************
 * Accordion implementation.
 ******************************************************************************************************************/
type Section = {
  header: AccordionSectionHeader;
  content: React.ReactNode;
};

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
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const theme = useTheme();

  // close on receiving trigger
  useEffect(() => {
    setActiveSections([]);
  }, [closeTrigger]);

  const renderHeader = (section: Section, _i: number, isActive: boolean) => (
    <ToggleHeader
      text={section.header.text}
      textOpts={section.header.textOpts}
      icon={section.header.icon}
      iconOpts={section.header.iconOpts}
      isCollapsed={!isActive}
    />
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
export const AccordionContainer: AccordionContainerType = memo(
  ({ sections, style, children }) => {
    const childArray = React.Children.toArray(children);

    if (childArray.length !== sections.length) {
      throw new Error(
        `AccordionContainer: sections.length (${sections.length}) must match children.length (${childArray.length})`
      );
    }

    const mergedSections: Section[] = sections.map((header, i) => ({
      header,
      content: childArray[i],
    }));

    const groups: Section[][] = [];
    for (let i = 0; i < mergedSections.length; i += GRP_SIZE) {
      groups.push(mergedSections.slice(i, i + GRP_SIZE));
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
  }
);

/******************************************************************************************************************
 * Styles.
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
});
