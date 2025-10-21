import React, { useContext, useState, useEffect, useCallback, useRef, JSX, memo } from 'react';
import { View } from 'react-native';
import { Text, Portal, Button, Card, IconButton, TouchableRipple } from 'react-native-paper';
import { Screen, UI_Core, Const } from 'framework';
const _ = require('lodash');

/******************************************************************************************************************
 * Defines
 ******************************************************************************************************************/
const PICKER_ITEM_LIST = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
]

const MENU_ITEM_LIST = [
  { label: 'Redo', value: 'redo', leadingIcon: 'redo' },
  { label: 'Undo', value: 'undo', leadingIcon: 'undo' },
  { label: 'Cut', value: 'cut', leadingIcon: 'content-cut', disabled: true },
  { label: 'Copy', value: 'copy', leadingIcon: 'content-copy' },
  { label: 'Paste', value: 'paste', leadingIcon: 'content-paste' },
];

const POPUP_MENU_OPTIONS = {
  'colors': {
    label: 'Colors',
    state: UI_Core.OptionState.Unselected,
    children: {
      'red': { label: 'Red', state: UI_Core.OptionState.Unselected },
      'blue': { label: 'Blue', state: UI_Core.OptionState.Unselected },
      'green': { label: 'Green', state: UI_Core.OptionState.Unselected },
    }
  },
  'class': {
    label: 'Class',
    state: UI_Core.OptionState.Unselected,
    children: {
      'mammals': { 
        label: 'Mammals',
        state: UI_Core.OptionState.Unselected,
        children: {
          'cat': { label: 'Cat', state: UI_Core.OptionState.Unselected },
          'dog': { label: 'Dog', state: UI_Core.OptionState.Unselected }
        }
      },
      'reptiles': { 
        label: 'Reptiles',
        state: UI_Core.OptionState.Unselected,
        children: {
          'turtle': { label: 'Turtle', state: UI_Core.OptionState.Unselected },
          'frog': { label: 'Frog', state: UI_Core.OptionState.Unselected },
          'lizard': { label: 'Lizard', state: UI_Core.OptionState.Unselected }
        }
      }
    }
  }
}

/******************************************************************************************************************
 * Menus demo
 ******************************************************************************************************************/
const MenusScreen: Screen.ScreenType = ({ navigation, route }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [popupMenuSelection, setPopupMenuSelection] = useState<UI_Core.OptionSchema>(_.cloneDeep(POPUP_MENU_OPTIONS));
  const [pickerSelection, setPickerSelection] = useState<string>('red');
  const [searchQuery, setSearchQuery] = useState('');

  function onSubmitDialog() {
    // some logic here
    setShowDialog(false);
  }

  function LeftContent() {
    return <UI_Core.HorizontalLayout justify='flex-end'>
      <UI_Core.Popup triggerComp={<IconButton icon='dots-vertical' size={Const.iconSizeSmall} />}>
        <UI_Core.CheckOptions schema={popupMenuSelection} setSchema={setPopupMenuSelection} />
      </UI_Core.Popup>
    </UI_Core.HorizontalLayout>;
  }

  return (
    <Screen.ScreenWrapper LeftContent={LeftContent}>
      {/* all dialogs here */}
      <Portal>
        <UI_Core.Dialog
          title='Lorem Ipsum Stuff'
          subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          isVisible={showDialog}
          onSubmit={onSubmitDialog}
          onClose={() => setShowDialog(false)}
        >
          <Card.Content>
            <Text variant='bodyMedium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Card.Content>
        </UI_Core.Dialog>
      </Portal>
      {/* main content */}
      <UI_Core.VerticalLayout>

        {/* launch popup dialog */}
        <Button mode='contained' onPress={() => setShowDialog(true)}>
          Launch dialog
        </Button>

        {/* picker */}
        <UI_Core.Picker value={pickerSelection} options={PICKER_ITEM_LIST} onChange={(v) => setPickerSelection(v)} />

        {/* menu */}
        <UI_Core.MenuList options={MENU_ITEM_LIST} onSelect={(v) => console.log(`clicked on ${v}`)} dense={true} />

        {/* input + highlight text */}
        <Text>Search for text in the passage below</Text>
        <UI_Core.TextInput
          type='search'
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder='search'
          style={{ marginTop: Const.padSize2 }}
        />
        <TouchableRipple rippleColor={'blue'} style={{ width: 100, height: 100, backgroundColor: 'red' }} onPress={() => console.log("Pressed")} >
          <Text>asdsadsad</Text>
        </TouchableRipple>
        <UI_Core.HighlightText query={searchQuery} variant={'bodyMedium'} style={{ marginTop: Const.padSize2 }} >
          Hero is a title reserved for those who perform truly great feats! Too many are undeserving... Just money worshipers playing hero! Until this society wakes up and rectifies itself... I will continue to do my work.
        </UI_Core.HighlightText>

      </UI_Core.VerticalLayout>
    </Screen.ScreenWrapper>
  );
};

export default memo(MenusScreen);