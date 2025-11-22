import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Input demo & usage guide
 *
 * This screen demonstrates how to use UI.TextInput as a controlled input field with different type presets:
 * - type: 'text' | 'numeric' | 'passcode' | 'search' | 'email' | 'phone'
 *
 * Each type configures keyboard behavior (and secure entry for passcode) while keeping a single, simple API.
 ******************************************************************************************************************/
const InputScreen: Screen.ScreenType = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [passcode, setPasscode] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const filteredFruits = fruits.filter((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll'>
        {/* Header */}
        <UI.Text variant='titleLarge'>Inputs</UI.Text>
        <UI.Text variant='bodySmall'>
          TextInput is a controlled field for user input. The{' '}
          <UI.Text variant='bodySmall' color='label'>
            type
          </UI.Text>{' '}
          prop switches between presets like text, numeric, passcode, search, email and phone, while
          keeping the same API.
        </UI.Text>

        <UI.Divider spacing={1} />

        {/* Section 1: Basic text input */}
        <UI.Text variant='titleMedium'>1. Basic text input</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Use <UI.Text variant='bodySmall' color='label'>type='text'</UI.Text> for general text input.
          The component is controlled via the <UI.Text variant='bodySmall' color='label'>value</UI.Text>{' '}
          and <UI.Text variant='bodySmall' color='label'>onChange</UI.Text> props.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Name
          </UI.Text>
          <UI.TextInput
            type='text'
            value={name}
            placeholder='Enter your name'
            onChange={setName}
          />
          <UI.Text variant='bodySmall' color='label'>
            Current value: {name || '<empty>'}
          </UI.Text>
        </UI.Box>

        {/* Section 2: Numeric, email & phone */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>2. Numeric, email &amp; phone</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Different types pick the appropriate keyboard:
          <UI.Text variant='bodySmall' color='label'> numeric</UI.Text> for numbers,
          <UI.Text variant='bodySmall' color='label'> email</UI.Text> for email addresses, and
          <UI.Text variant='bodySmall' color='label'> phone</UI.Text> for phone numbers.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Age (numeric)
          </UI.Text>
          <UI.TextInput
            type='numeric'
            value={age}
            placeholder='e.g. 21'
            onChange={setAge}
            maxLength={3}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Email
          </UI.Text>
          <UI.TextInput
            type='email'
            value={email}
            placeholder='you@example.com'
            onChange={setEmail}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Phone
          </UI.Text>
          <UI.TextInput
            type='phone'
            value={phone}
            placeholder='e.g. +65 1234 5678'
            onChange={setPhone}
          />
        </UI.Box>

        {/* Section 3: Passcode (secure entry) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>3. Passcode</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          <UI.Text variant='bodySmall' color='label'>type='passcode'</UI.Text> uses a numeric keyboard
          and hides the characters via secure entry.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            4-digit passcode
          </UI.Text>
          <UI.TextInput
            type='passcode'
            value={passcode}
            placeholder='••••'
            onChange={setPasscode}
            maxLength={4}
          />
          <UI.Text variant='bodySmall' color='label'>
            Length: {passcode.length} / 4
          </UI.Text>
        </UI.Box>

        {/* Section 4: Search input */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>4. Search</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          <UI.Text variant='bodySmall' color='label'>type='search'</UI.Text> renders a search bar.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.TextInput
            type='search'
            value={searchQuery}
            placeholder='Search fruits'
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

        {/* Section 5: Multiline notes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>5. Multiline notes</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Enable <UI.Text variant='bodySmall' color='label'>multiline</UI.Text> and{' '}
          <UI.Text variant='bodySmall' color='label'>numberOfLines</UI.Text> for textareas or comment
          fields.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Notes
          </UI.Text>
          <UI.TextInput
            type='text'
            value={notes}
            placeholder='Write a short note...'
            onChange={setNotes}
            multiline
            numberOfLines={4}
            style={{
              minHeight: 80,
            }}
          />
        </UI.Box>

        {/* Section 6: Disabled state */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>6. Disabled input</UI.Text>
        <UI.Text variant='bodySmall' color='label'>
          Set <UI.Text variant='bodySmall' color='label'>editable=false</UI.Text> to show a disabled
          field that cannot be changed.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Read-only example
          </UI.Text>
          <UI.TextInput
            type='text'
            value='This field is disabled'
            editable={false}
          />
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(InputScreen);
