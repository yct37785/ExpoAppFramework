import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Colors and sizing helpers
 ******************************************************************************************************************/
const tier1 = '#f4e0c3ff';
const tier2 = '#bbe6fbff';
const tier3 = '#f990e9ff';
const small = 50;
const big = 80;

/******************************************************************************************************************
 * Small colored box used to visualize layouts
 ******************************************************************************************************************/
const BlockBox: React.FC<{
  i: number;
  width: number;
  height: number;
  bgColor?: string;
}> = ({ i, width, height, bgColor = tier2 }) => (
  <UI.Box
    align='center'
    justify='center'
    bgColor={bgColor}
    style={{ width, height }}
  >
    <UI.Text variant='labelSmall'>child {i}</UI.Text>
  </UI.Box>
);

/******************************************************************************************************************
 * Layouts Demo & Usage Page
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>

        {/* Title Section */}
        <UI.Text variant='titleLarge'>Layouts</UI.Text>
        <UI.Text variant='bodySmall'>
          Layouts are higher-level containers that arrange children in{' '}
          <UI.Text variant='bodySmall' bold>rows</UI.Text> or{' '}
          <UI.Text variant='bodySmall' bold>columns</UI.Text>, with built-in spacing,
          padding, wrapping, and scroll behavior. Use them for structure, and use{' '}
          <UI.Text variant='bodySmall' color='label'>Box</UI.Text> for smaller visual wrappers.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* -----------------------------------------------------
         * 1. dir & reverse
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>1. dir &amp; reverse</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Start by choosing the main direction:{' '}
          <UI.Text color='label'>dir='row'</UI.Text> for horizontal or{' '}
          <UI.Text color='label'>dir='column'</UI.Text> for vertical layouts.
          Add <UI.Text color='label'>reverse</UI.Text> to flip the order of children.
        </UI.Text>

        <UI.Box mt={1} />

        {/* Row */}
        <UI.Text variant='labelSmall' color='label'>dir='row'</UI.Text>
        <UI.HorizontalLayout bgColor={tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.HorizontalLayout>

        <UI.Box mt={1} />

        {/* Row reverse */}
        <UI.Text variant='labelSmall' color='label'>dir='row' + reverse</UI.Text>
        <UI.HorizontalLayout bgColor={tier1} gap={1} reverse>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.HorizontalLayout>

        <UI.Box mt={1} />

        {/* Column */}
        <UI.Text variant='labelSmall' color='label'>dir='column'</UI.Text>
        <UI.VerticalLayout bgColor={tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.VerticalLayout>

        <UI.Box mt={1} />

        {/* Column reverse */}
        <UI.Text variant='labelSmall' color='label'>dir='column' + reverse</UI.Text>
        <UI.VerticalLayout bgColor={tier1} gap={1} reverse>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.VerticalLayout>

        <UI.Divider spacing={2} />

        {/* -----------------------------------------------------
         * 2. constraint='wrap'
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>2. constraint='wrap'</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Use <UI.Text color='label'>constraint='wrap'</UI.Text> when you want items to
          flow onto new rows (for rows) or new columns (for columns) once they run out
          of space.
        </UI.Text>

        <UI.Box mt={1} />

        {/* Vertical wrap */}
        <UI.Text variant='labelSmall' color='label'>
          VerticalLayout (wrap)
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Here we fix the height so you can see children wrap within that vertical space.
        </UI.Text>
        <UI.VerticalLayout constraint='wrap' bgColor={tier1} height={190} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={big} height={small} />
          <BlockBox i={3} width={big} height={small} />
          <BlockBox i={4} width={small} height={big} />
          <BlockBox i={5} width={big} height={big} />
          <BlockBox i={6} width={big} height={small} />
        </UI.VerticalLayout>

        <UI.Box mt={1} />

        {/* Horizontal wrap */}
        <UI.Text variant='labelSmall' color='label'>HorizontalLayout (wrap)</UI.Text>
        <UI.HorizontalLayout constraint='wrap' bgColor={tier1} gap={1}>
          <BlockBox i={1} width={big} height={small} />
          <BlockBox i={2} width={small} height={big} />
          <BlockBox i={3} width={small} height={small} />
          <BlockBox i={4} width={big} height={small} />
          <BlockBox i={5} width={big} height={small} />
        </UI.HorizontalLayout>

        <UI.Divider spacing={2} />

        {/* -----------------------------------------------------
         * 3. constraint='scroll'
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>3. constraint='scroll'</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Use <UI.Text color='label'>constraint='scroll'</UI.Text> when children should be
          scrollable along the main axis (horizontal for rows, vertical for columns).
        </UI.Text>

        <UI.Box mt={1} />

        {/* Horizontal scroll */}
        <UI.Text variant='labelSmall' color='label'>Horizontal scroll</UI.Text>
        <UI.HorizontalLayout constraint='scroll' bgColor={tier1} gap={1}>
          {Array.from({ length: 6 }).map((_, i) => (
            <BlockBox key={i} i={i + 1} width={big} height={small} />
          ))}
        </UI.HorizontalLayout>

        <UI.Box mt={1} />

        {/* Vertical scroll (parent) */}
        <UI.Text variant='labelSmall' color='label'>
          Vertical scrolling (refer to parent layout)
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          This screen already uses a parent{' '}
          <UI.Text variant='bodySmall' color='label'>VerticalLayout</UI.Text>{' '}
          with <UI.Text variant='bodySmall' color='label'>constraint='scroll'</UI.Text>,
          so content in this section scrolls together with the page.
          Nested vertical scrolling is not supported.
        </UI.Text>

        <UI.Divider spacing={2} />

        {/* -----------------------------------------------------
         * 4. gap demonstration (0–4)
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>4. gap (0–4)</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          <UI.Text color='label'>gap</UI.Text> adds spacing between children and also
          behaves like internal padding for the layout. It uses the same{' '}
          <UI.Text color='label'>PadSpacingValue</UI.Text> scale as Box.
        </UI.Text>

        <UI.Box mt={1} />

        <UI.Text variant='labelSmall' color='label'>gap = 2</UI.Text>
        <UI.HorizontalLayout bgColor={tier1} constraint='wrap' gap={2}>
          <BlockBox i={1} width={small} height={small} bgColor={tier2} />
          <BlockBox i={2} width={small} height={small} bgColor={tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={tier2} />
        </UI.HorizontalLayout>

        <UI.Divider spacing={2} />

        {/* -----------------------------------------------------
         * 5. Nested layouts (grid-like)
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>5. Nested layouts</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Combine <UI.Text color='label'>HorizontalLayout</UI.Text> and{' '}
          <UI.Text color='label'>VerticalLayout</UI.Text> to build grid-like structures
          and dashboards.
        </UI.Text>

        <UI.Box mt={1} />

        <UI.HorizontalLayout bgColor={tier1} gap={2}>
          <UI.VerticalLayout flex={1} bgColor={tier2} gap={1}>
            <BlockBox i={1} width={small} height={small} bgColor={tier3} />
            <BlockBox i={2} width={small} height={small} bgColor={tier3} />
          </UI.VerticalLayout>

          <UI.VerticalLayout flex={1} bgColor={tier2} gap={1}>
            <BlockBox i={3} width={small} height={small} bgColor={tier3} />
            <BlockBox i={4} width={small} height={small} bgColor={tier3} />
          </UI.VerticalLayout>
        </UI.HorizontalLayout>

        <UI.Divider spacing={2} />

        {/* -----------------------------------------------------
         * 6. Putting it together: simple app layout
         * ----------------------------------------------------- */}
        <UI.Text variant='titleMedium'>6. Putting it together: simple app layout</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Here&apos;s a small example of using layouts to structure a header, content area,
          and footer.
        </UI.Text>

        <UI.Box mt={1} />

        <UI.VerticalLayout bgColor={tier1} gap={1}>
          {/* header row */}
          <UI.HorizontalLayout bgColor={tier2} gap={1}>
            <UI.Box flex={1}>
              <UI.Text variant='labelMedium'>Header</UI.Text>
            </UI.Box>
            <UI.Box>
              <UI.Button mode='text' onPress={() => {}}>
                Action
              </UI.Button>
            </UI.Box>
          </UI.HorizontalLayout>

          {/* content row */}
          <UI.HorizontalLayout bgColor={tier2} gap={1}>
            <UI.VerticalLayout flex={1} bgColor={tier3} gap={1}>
              <UI.Text variant='labelSmall'>Sidebar</UI.Text>
            </UI.VerticalLayout>
            <UI.VerticalLayout flex={2} bgColor='#ffffff' gap={1}>
              <UI.Text variant='labelSmall'>Main content</UI.Text>
              <UI.Text variant='bodySmall' color='label'>
                Layouts handle the structure, while Box and other components fill in the details.
              </UI.Text>
            </UI.VerticalLayout>
          </UI.HorizontalLayout>

          {/* footer row */}
          <UI.HorizontalLayout bgColor={tier2} gap={1}>
            <UI.Text variant='labelSmall'>Footer area</UI.Text>
          </UI.HorizontalLayout>
        </UI.VerticalLayout>

        <UI.Divider spacing={2} />

        {/* Usage notes */}
        <UI.Text variant='titleMedium'>Usage Notes</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label' bold>Layouts</UI.Text> to control direction, flow, and spacing.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label' bold>Box</UI.Text> inside layouts as smaller building blocks.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Use <UI.Text variant='bodySmall' color='label' bold>gap</UI.Text> for consistent spacing and padding.
        </UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          • Choose <UI.Text variant='bodySmall' color='label' bold>wrap</UI.Text> or{' '}
          <UI.Text variant='bodySmall' color='label' bold>scroll</UI.Text> based on how content should behave when it overflows.
        </UI.Text>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LayoutScreen);
