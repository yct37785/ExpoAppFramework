import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Box demo & usage guide
 *
 * This screen demonstrates how to use UI.Box as a layout-friendly container.
 * - bgColor: string (background color)
 * - flex: number
 * - dir: 'row' | 'column'
 * - align: alignItems
 * - justify: justifyContent
 * - p, m, ph, pv, pt, pr, pb, pl, mh, mv, mt, mr, mb, ml: PadSpacingValue (0–4)
 *
 * PadSpacingValue is a scaled spacing unit:
 *  0 = none
 *  1 = 1x base spacing
 *  2 = 2x base spacing
 *  3 = 3x base spacing
 *  4 = 4x base spacing
 ******************************************************************************************************************/
const BoxScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>
        {/* Header */}
        <UI.Text variant='titleLarge'>Box</UI.Text>
        <UI.Text variant='bodySmall'>Box is a drawable container that wraps content and applies flex layout, alignment, and spacing. It
          doesn&apos;t decide how siblings are arranged; instead, it acts as a flexible building block.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* Section 1: Basic usage */}
        <UI.Text variant='titleMedium'>1. Basic usage</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Use Box wherever you would normally use a View, but with convenient shorthands for padding/margin.
        </UI.Text>

        <UI.Box bgColor='#2eb82e' p={1} m={1}>
          <UI.Text color='surface'>Use Box like a View</UI.Text>
        </UI.Box>

        {/* Section 2: PadSpacingValue (spacing scale) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>2. Spacing scale (PadSpacingValue)</UI.Text>
        <UI.Text variant='bodySmall'>
          Spacing props accept a{' '}
          <UI.Text variant='bodySmall' color='label'>
            PadSpacingValue
          </UI.Text>{' '}
          of <UI.Text color='label'>0 | 1 | 2 | 3 | 4</UI.Text>, which the framework multiplies by a base
          spacing constant.
        </UI.Text>

        <UI.Box dir='row' mv={1}>
          <UI.Box bgColor='#eeeeee' p={0} m={1}>
            <UI.Text variant='labelSmall'>p=0</UI.Text>
          </UI.Box>
          <UI.Box bgColor='#eeeeee' p={1} m={1}>
            <UI.Text variant='labelSmall'>p=1</UI.Text>
          </UI.Box>
          <UI.Box bgColor='#eeeeee' p={2} m={1}>
            <UI.Text variant='labelSmall'>p=2</UI.Text>
          </UI.Box>
          <UI.Box bgColor='#eeeeee' p={3} m={1}>
            <UI.Text variant='labelSmall'>p=3</UI.Text>
          </UI.Box>
          <UI.Box bgColor='#eeeeee' p={4} m={1}>
            <UI.Text variant='labelSmall'>p=4</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Section 3: Flex, direction, alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>3. Flex, direction &amp; alignment</UI.Text>

        <UI.Text variant='labelSmall' color='label'>
          Row layout with different flex values
        </UI.Text>
        <UI.Box dir='row' bgColor='#f0f0f0' p={1} mv={1}>
          <UI.Box flex={1} bgColor='#9de923'>
            <UI.Text variant='labelSmall'>flex=1</UI.Text>
          </UI.Box>
          <UI.Box flex={2} bgColor='#ffdd55' ml={1}>
            <UI.Text variant='labelSmall'>flex=2</UI.Text>
          </UI.Box>
          <UI.Box flex={0} bgColor='#ff9999' ml={1}>
            <UI.Text variant='labelSmall'>flex=0 (no grow)</UI.Text>
          </UI.Box>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          Row · justify=&quot;space-between&quot;
        </UI.Text>
        <UI.Box dir='row' bgColor='#ffe0b2' p={1} justify='space-between' mv={1}>
          <UI.Text variant='labelSmall'>Item A</UI.Text>
          <UI.Text variant='labelSmall'>Item B</UI.Text>
          <UI.Text variant='labelSmall'>Item C</UI.Text>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          Column · justify=&quot;center&quot; (vertical center) with fixed height
        </UI.Text>
        <UI.Box
          dir='column'
          justify='center'
          bgColor='#e1f5fe'
          p={1}
          mv={1}
          style={{ height: 120 }}
        >
          <UI.Text variant='labelSmall' color='primary'>
            content is vertically centered
          </UI.Text>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          Row · align=&quot;center&quot; (cross-axis alignment)
        </UI.Text>
        <UI.Box
          dir='row'
          align='center'
          bgColor='#f3e5f5'
          p={1}
          mv={1}
          style={{ height: 80 }}
        >
          <UI.Box bgColor='#ce93d8' p={1}>
            <UI.Text variant='labelSmall'>short</UI.Text>
          </UI.Box>
          <UI.Box bgColor='#ba68c8' p={2} ml={1}>
            <UI.Text variant='labelSmall'>taller item</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Section 4: Padding & margin shorthands */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>4. Padding &amp; margin shorthands</UI.Text>

        <UI.Text variant='labelSmall' color='label'>
          p / m (uniform)
        </UI.Text>
        <UI.Box bgColor='#212121' p={2} m={1}>
          <UI.Text color='surface' variant='labelSmall'>
            p=2, m=1
          </UI.Text>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          pv / ph (vertical / horizontal)
        </UI.Text>
        <UI.Box bgColor='#424242' pv={1} ph={2} m={1}>
          <UI.Text color='surface' variant='labelSmall'>
            pv=1, ph=2
          </UI.Text>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          Side-specific padding (pt / pr / pb / pl)
        </UI.Text>
        <UI.Box bgColor='#616161' pt={2} pr={1} pb={1} pl={3} m={1}>
          <UI.Text color='surface' variant='labelSmall'>
            pt=2, pr=1, pb=1, pl=3
          </UI.Text>
        </UI.Box>

        <UI.Text variant='labelSmall' color='label'>
          Side-specific margin (mt / mr / mb / ml)
        </UI.Text>
        <UI.Box bgColor='#9e9e9e' p={1} m={1}>
          <UI.Box bgColor='#212121' mt={1} mr={2} mb={1} ml={3}>
            <UI.Text color='surface' variant='labelSmall'>
              mt=1, mr=2, mb=1, ml=3
            </UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Section 5: Example “Card” layout */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>5. Putting it together: a card layout</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          This card UI is built entirely with Box for layout and spacing.
        </UI.Text>

        <UI.Box bgColor='#eeeeee' p={1} m={1}>
          <UI.Box bgColor='#ffffff' p={2}>
            {/* header row */}
            <UI.Box dir='row' align='center' mb={1}>
              <UI.Avatar label='JD' size='sm' />
              <UI.Box ml={1}>
                <UI.Text variant='labelMedium'>Jane Doe</UI.Text>
                <UI.Text variant='labelSmall' color='secondary'>
                  Product Designer
                </UI.Text>
              </UI.Box>
            </UI.Box>

            {/* body */}
            <UI.Text variant='bodySmall'>
              This is an example of using Box to compose a simple card layout with avatar, text, and
              actions.
            </UI.Text>

            {/* actions */}
            <UI.Box dir='row' justify='flex-end' mt={2}>
              <UI.Button mode='text' onPress={() => {}}>
                Cancel
              </UI.Button>
              <UI.Box ml={1}>
                <UI.Button mode='contained' onPress={() => {}}>
                  Save
                </UI.Button>
              </UI.Box>
            </UI.Box>
          </UI.Box>
        </UI.Box>

        {/* Section 6: Box as a small layout wrapper */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>6. Box as a small wrapper</UI.Text>
        <UI.Text variant='bodySmall'>
          You can also use Box as a tiny wrapper around a single element just to add spacing, without
          changing layout flow.
        </UI.Text>

        <UI.Box m={1}>
          <UI.Box bgColor='#e0f2f1' p={1}>
            <UI.Text variant='labelSmall'>
              This inner Box only adds padding and background around the text.
            </UI.Text>
          </UI.Box>
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(BoxScreen);
