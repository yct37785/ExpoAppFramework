import React, { memo } from 'react';
import { Screen, UI } from 'framework';

const BASIC_SECTIONS = [
  { text: 'First section' },
  { text: 'Second section' },
  { text: 'Third section' },
];

const CUSTOM_SECTIONS: UI.AccordionSectionHeader[] = [
  {
    text: 'Overview',
    icon: 'information-outline',
    textOpts: { variant: 'labelMedium', color: 'primary' },
    iconOpts: { customColor: '#1976d2' }, // blue
  },
  {
    text: 'Details',
    icon: 'file-document-outline',
    textOpts: { variant: 'labelMedium', color: 'secondary' },
    iconOpts: { customColor: '#388e3c' }, // green
  },
  {
    text: 'Activity',
    icon: 'history',
    textOpts: { variant: 'labelMedium', color: 'error' },
    iconOpts: { customColor: '#d32f2f' }, // red
  },
];

const CollapsiblesScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>
        {/* Header */}
        <UI.Text variant='titleLarge'>Collapsibles</UI.Text>
        <UI.Text variant='bodySmall'>
          This page demonstrates{' '}
          <UI.Text variant='bodySmall' color='label'>
            CollapsibleContainer
          </UI.Text>{' '}
          and{' '}
          <UI.Text variant='bodySmall' color='label'>
            AccordionContainer
          </UI.Text>
          , including the new{' '}
          <UI.Text variant='bodySmall' color='label'>
            text
          </UI.Text>
          ,{' '}
          <UI.Text variant='bodySmall' color='label'>
            textOpts
          </UI.Text>
          ,{' '}
          <UI.Text variant='bodySmall' color='label'>
            icon
          </UI.Text>{' '}
          and{' '}
          <UI.Text variant='bodySmall' color='label'>
            iconOpts
          </UI.Text>{' '}
          props for customizing headers.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* 1. CollapsibleContainer */}
        <UI.Text variant='titleMedium'>1. CollapsibleContainer</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          A single header that toggles visibility of its content.
        </UI.Text>

        {/* 1.1 Basic collapsible (text only) */}
        <UI.Box mv={1}>
          <UI.Text variant='labelSmall' color='label'>
            Basic collapsible
          </UI.Text>
        </UI.Box>

        <UI.CollapsibleContainer text='Tap to toggle'>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>
              Simple collapsible using{' '}
              <UI.Text variant='bodySmall' color='label'>
                text
              </UI.Text>
              .
            </UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* 1.2 Collapsible with custom text + icon + custom colors */}
        <UI.Box mt={2} mb={1}>
          <UI.Text variant='labelSmall' color='label'>
            Collapsible with textOpts, icon &amp; custom colors
          </UI.Text>
        </UI.Box>

        <UI.CollapsibleContainer
          text='Advanced settings'
          textOpts={{ variant: 'labelMedium', color: 'primary' }}
          icon='tune'
          iconOpts={{ variant: 'md', customColor: '#ff9800' }} // orange icon
        >
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>
              This header uses{' '}
              <UI.Text variant='bodySmall' color='label'>
                textOpts
              </UI.Text>{' '}
              to set the font variant and color, and an{' '}
              <UI.Text variant='bodySmall' color='label'>
                icon
              </UI.Text>{' '}
              with a custom color via{' '}
              <UI.Text variant='bodySmall' color='label'>
                iconOpts
              </UI.Text>
              .
            </UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        <UI.Divider spacing={2} />

        {/* 2. AccordionContainer */}
        <UI.Text variant='titleMedium'>2. AccordionContainer</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Multiple collapsible sections where only one is open at a time.
        </UI.Text>

        {/* 2.1 Basic accordion (text only) */}
        <UI.Box mt={1} mb={1}>
          <UI.Text variant='labelSmall' color='label'>
            Basic accordion
          </UI.Text>
        </UI.Box>

        <UI.AccordionContainer sections={BASIC_SECTIONS}>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the first section.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the second section.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Content for the third section.</UI.Text>
          </UI.Box>
        </UI.AccordionContainer>

        {/* 2.2 Accordion with custom textOpts & icon/iconOpts per section */}
        <UI.Box mt={2} mb={1}>
          <UI.Text variant='labelSmall' color='label'>
            Accordion with custom headers (colors &amp; icons)
          </UI.Text>
        </UI.Box>

        <UI.AccordionContainer sections={CUSTOM_SECTIONS}>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Overview content.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Details content.</UI.Text>
          </UI.Box>
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>Activity content.</UI.Text>
          </UI.Box>
        </UI.AccordionContainer>

        {/* Usage notes */}
        <UI.Divider spacing={2} />

        <UI.Text variant='titleMedium'>Usage notes</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • For <UI.Text variant='bodySmall' color='label'>CollapsibleContainer</UI.Text>, prefer{' '}
          <UI.Text variant='bodySmall' color='label'>text</UI.Text> over the legacy{' '}
          <UI.Text variant='bodySmall' color='label'>toggleHeaderText</UI.Text>.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label'>textOpts</UI.Text> to adjust typography
          (variant, color, etc.).
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label'>icon</UI.Text> and{' '}
          <UI.Text variant='bodySmall' color='label'>iconOpts</UI.Text> to add and style a leading
          icon, including custom colors.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • For <UI.Text variant='bodySmall' color='label'>AccordionContainer</UI.Text>, the{' '}
          <UI.Text variant='bodySmall' color='label'>sections</UI.Text> array must have the same
          length as the children.
        </UI.Text>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(CollapsiblesScreen);
