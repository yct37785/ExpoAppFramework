import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * InputScreen
 *
 * Demonstrates usage of UI.TextInput:
 * - label + variant ("flat" / "outline")
 * - different input types (text, numeric, password, search, email, phone)
 * - leading and trailing icons
 * - multiline and disabled states
 ******************************************************************************************************************/
const InputScreen: Screen.ScreenType = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notes, setNotes] = useState<string>('This note is editable.');

  const fruits = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape'];
  const filteredFruits = fruits.filter((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' gap={1}>
        {/* Title + Intro */}
        <UI.Box>
          <UI.Text variant='titleLarge'>Inputs</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            TextInput is a controlled field for user input. The{' '}
            <UI.Text variant='bodySmall' color='label'>type</UI.Text>{' '}
            prop selects the keyboard and behaviours, while{' '}
            <UI.Text variant='bodySmall' color='label'>label</UI.Text>{' '}
            and{' '}
            <UI.Text variant='bodySmall' color='label'>variant</UI.Text>{' '}
            control presentation.
          </UI.Text>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 1: Basic text (flat) */}
        <UI.Box>
          <UI.Text variant='titleMedium'>1. Basic text input</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            Use <UI.Text variant='bodySmall' color='label'>type="text"</UI.Text> for general
            single-line text. The field is controlled via{' '}
            <UI.Text variant='bodySmall' color='label'>value</UI.Text> and{' '}
            <UI.Text variant='bodySmall' color='label'>onChange</UI.Text>.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='text'
              label='Name'
              variant='flat'
              value={name}
              placeholder='Your full name'
              onChange={setName}
            />
            <UI.Text variant='bodySmall' color='label'>
              Current: {name || '<empty>'}
            </UI.Text>
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 2: Variants (flat vs outline) */}
        <UI.Box>
          <UI.Text variant='titleMedium'>2. Variants</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            Choose between a subtle{' '}
            <UI.Text variant='bodySmall' color='label'>flat</UI.Text> background or an{' '}
            <UI.Text variant='bodySmall' color='label'>outline</UI.Text> with borders.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.Text variant='labelSmall' color='label'>
              Flat variant
            </UI.Text>
            <UI.TextInput
              type='text'
              label='Project title'
              variant='flat'
              value={name}
              placeholder='My next big idea'
              onChange={setName}
            />
          </UI.Box>

          <UI.Box mt={1}>
            <UI.Text variant='labelSmall' color='label'>
              Outline variant
            </UI.Text>
            <UI.TextInput
              type='text'
              label='Project title'
              variant='outline'
              value={name}
              placeholder='My next big idea'
              onChange={setName}
            />
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 3: Numeric, email, phone */}
        <UI.Box>
          <UI.Text variant='titleMedium'>3. Numeric, email &amp; phone</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            The <UI.Text variant='bodySmall' color='label'>type</UI.Text> sets a suitable
            keyboard: <UI.Text variant='bodySmall' color='label'>numeric</UI.Text> for numbers,
            <UI.Text variant='bodySmall' color='label'>email</UI.Text> for email addresses and{' '}
            <UI.Text variant='bodySmall' color='label'>phone</UI.Text> for phone numbers.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='numeric'
              label='Age'
              variant='outline'
              value={age}
              placeholder='e.g. 21'
              onChange={setAge}
              maxLength={3}
            />
          </UI.Box>

          <UI.Box mt={1}>
            <UI.TextInput
              type='email'
              label='Email'
              variant='outline'
              value={email}
              placeholder='you@example.com'
              onChange={setEmail}
            />
          </UI.Box>

          <UI.Box mt={1}>
            <UI.TextInput
              type='phone'
              label='Phone'
              variant='outline'
              value={phone}
              placeholder='e.g. +65 1234 5678'
              onChange={setPhone}
            />
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 4: Password with trailing eye icon */}
        <UI.Box>
          <UI.Text variant='titleMedium'>4. Password with toggle</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            <UI.Text variant='bodySmall' color='label'>type="password"</UI.Text> hides the
            characters and shows an eye icon to toggle visibility. Clearing is still available
            when a custom trailing icon is not provided.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='password'
              label='Password'
              variant='outline'
              value={password}
              placeholder='Enter a secure password'
              onChange={setPassword}
            />
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 5: Search with leading + trailing icons */}
        <UI.Box>
          <UI.Text variant='titleMedium'>5. Search with icons</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            <UI.Text variant='bodySmall' color='label'>type="search"</UI.Text> defaults to a
            search icon on the left. When there is text, a clear icon appears on the right.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='search'
              label='Search fruits'
              variant='flat'
              value={searchQuery}
              placeholder='Start typing to filter...'
              onChange={setSearchQuery}
            />

            <UI.Box mt={1}>
              {filteredFruits.length === 0 ? (
                <UI.Text variant='bodySmall' color='label'>
                  No matches found.
                </UI.Text>
              ) : (
                filteredFruits.map((fruit) => (
                  <UI.Box key={fruit} mv={1}>
                    <UI.Text variant='bodySmall'>{fruit}</UI.Text>
                  </UI.Box>
                ))
              )}
            </UI.Box>
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 6: Multiline */}
        <UI.Box>
          <UI.Text variant='titleMedium'>6. Multiline notes</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            Enable <UI.Text variant='bodySmall' color='label'>multiline</UI.Text> and{' '}
            <UI.Text variant='bodySmall' color='label'>numberOfLines</UI.Text> for comments or
            short descriptions.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='text'
              label='Notes'
              variant='flat'
              value={notes}
              placeholder='Write a short note...'
              onChange={setNotes}
              multiline
              numberOfLines={4}
              style={{ minHeight: 80 }}
            />
          </UI.Box>
        </UI.Box>

        <UI.Divider spacing={1} />

        {/* Section 7: Disabled input */}
        <UI.Box mb={4}>
          <UI.Text variant='titleMedium'>7. Disabled state</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            Set <UI.Text variant='bodySmall' color='label'>editable=false</UI.Text> to make the
            input read-only while preserving its visual style.
          </UI.Text>

          <UI.Box mt={1}>
            <UI.TextInput
              type='text'
              label='Read-only'
              variant='outline'
              value='This field is disabled'
              editable={false}
            />
          </UI.Box>
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(InputScreen);
