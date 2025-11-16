import React, { memo } from 'react';
import { Screen, UI, Const } from 'framework';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const BASIC_ACCORDION_TITLES = ['First', 'Second', 'Third'];
const ADVANCED_ACCORDION_TITLES = [
  'Overview',
  'Details',
  'Comments',
  'History',
  'Attachments',
  'More',
];

const CollapsiblesScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>
        {/* Header */}
        <UI.Text variant='titleLarge'>Collapsibles</UI.Text>
        <UI.Text variant='bodySmall'>
          Collapsible components provide expandable sections of content:
          {' '}
          <UI.Text variant='bodySmall' color='label'>CollapsibleContainer</UI.Text>
          {' '}and{' '}
          <UI.Text variant='bodySmall' color='label'>AccordionContainer</UI.Text>.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* 1. CollapsibleContainer */}
        <UI.Text variant='titleMedium'>1. CollapsibleContainer</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          A single header that toggles a collapsible area.
        </UI.Text>

        {/* Basic Example */}
        <UI.Box mv={1}>
          <UI.Text variant='labelSmall' color='label'>Basic collapsible</UI.Text>
        </UI.Box>

        <UI.CollapsibleContainer toggleHeaderText='Tap to toggle'>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>
              This content is inside a{' '}
              <UI.Text variant='bodySmall' color='label'>CollapsibleContainer</UI.Text>.
            </UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* Long content */}
        <UI.Box mt={2} mb={1}>
          <UI.Text variant='labelSmall' color='label'>Collapsible with long content</UI.Text>
        </UI.Box>

        <UI.CollapsibleContainer toggleHeaderText='Show more details'>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>{lorem}</UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* Nested content */}
        <UI.Box mt={2} mb={1}>
          <UI.Text variant='labelSmall' color='label'>Collapsible with nested UI</UI.Text>
        </UI.Box>

        <UI.CollapsibleContainer toggleHeaderText='Advanced settings'>
          <UI.Box p={1} bgColor='#f5f5f5'>

            <UI.Box dir='row' align='center' mb={1}>
              <UI.Icon source='tune' variant='sm' />
              <UI.Box ml={1}>
                <UI.Text variant='labelMedium'>Filters</UI.Text>
                <UI.Text variant='bodySmall' color='secondary'>
                  Configure advanced filter options
                </UI.Text>
              </UI.Box>
            </UI.Box>

            <UI.Box dir='row' align='center' mb={1}>
              <UI.Icon source='brightness-6' variant='sm' />
              <UI.Box ml={1}>
                <UI.Text variant='labelSmall'>Theme</UI.Text>
                <UI.Text variant='bodySmall'>
                  Switch between light and dark appearance.
                </UI.Text>
              </UI.Box>
            </UI.Box>

            <UI.Box dir='row' align='center'>
              <UI.Icon source='bell-outline' variant='sm' />
              <UI.Box ml={1}>
                <UI.Text variant='labelSmall'>Notifications</UI.Text>
                <UI.Text variant='bodySmall'>
                  Control alerts and reminder behavior.
                </UI.Text>
              </UI.Box>
            </UI.Box>

          </UI.Box>
        </UI.CollapsibleContainer>

        <UI.Divider spacing={2} />

        {/* 2. AccordionContainer */}
        <UI.Text variant='titleMedium'>2. AccordionContainer</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Multiple collapsible sections with only one open at a time.
        </UI.Text>

        {/* Basic Accordion */}
        <UI.Box mt={1} mb={1}>
          <UI.Text variant='labelSmall' color='label'>Basic accordion</UI.Text>
        </UI.Box>

        <UI.AccordionContainer sectionTitles={BASIC_ACCORDION_TITLES}>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the First section.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the Second section.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the Third section.</UI.Text>
          </UI.Box>
        </UI.AccordionContainer>

        {/* Larger Accordion */}
        <UI.Box mt={2} mb={1}>
          <UI.Text variant='labelSmall' color='label'>Large accordion</UI.Text>
        </UI.Box>

        <UI.AccordionContainer sectionTitles={ADVANCED_ACCORDION_TITLES}>
          <UI.Box p={1}><UI.Text variant='bodySmall'>Overview content.</UI.Text></UI.Box>
          <UI.Box p={1}><UI.Text variant='bodySmall'>Details content.</UI.Text></UI.Box>
          <UI.Box p={1}><UI.Text variant='bodySmall'>Comments content.</UI.Text></UI.Box>
          <UI.Box p={1}><UI.Text variant='bodySmall'>History content.</UI.Text></UI.Box>
          <UI.Box p={1}><UI.Text variant='bodySmall'>Attachments content.</UI.Text></UI.Box>
          <UI.Box p={1}><UI.Text variant='bodySmall'>More content.</UI.Text></UI.Box>
        </UI.AccordionContainer>

        {/* Usage notes */}
        <UI.Divider spacing={2} />

        <UI.Text variant='titleMedium'>Usage notes</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label'>CollapsibleContainer</UI.Text> for a single toggle section.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label'>AccordionContainer</UI.Text> for multi-section layouts.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • The number of children must match the length of <UI.Text variant='bodySmall' color='label'>sectionTitles</UI.Text>.
        </UI.Text>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(CollapsiblesScreen);
