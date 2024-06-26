/***************************************************************************************
* showcase menu UI elements
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import { LinearLayout, ScreenLayout, Dialog, Popup, PickerInput, CheckOptions, ChipOptions } from '../../../Framework/Index/UI';
import { iconSizeSmall } from '../../../Framework/Index/CommonVals';
// const
const PICKER_ITEM_LIST = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];
const POPUP_MENU_OPTIONS = [
  {
    label: 'Colors',
    value: 'colors',
    children: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ],
  },
  {
    label: 'Class',
    value: 'class',
    children: [
      { 
        label: 'Mammals',
        value: 'mammals',
        children: [
          { label: 'Cat', value: 'cat' },
          { label: 'Dog', value: 'dog' }
        ]
      },
      {
        label: 'Reptiles',
        value: 'reptiles',
        children: [
          { label: 'Turtle', value: 'turtle' },
          { label: 'Frog', value: 'frog' },
          { label: 'Lizard', value: 'lizard' }
        ]
      },
    ],
  },
];

/**
 * Display sample menus screen
 */
export default function SampleMenusScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const theme = useTheme();
  const searchBarRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [pickerSelection, setPickerSelection] = useState('red');
  const [popupMenuSelection, setPopupMenuSelection] = useState({});

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', (e) => {
      if (searchBarRef.current) {
        searchBarRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, [searchBarRef]);

  function onSubmitDialog() {
    // some logic here
    setShowDialog(false);
  }

  const handlePopupMenuSelectionChange = (selectedValues) => {
    setPopupMenuSelection(selectedValues);
  };

  function customHeaderContent() {
    return <LinearLayout align='horizontal' reverse={true}>
      <Popup triggerComp={<IconButton icon="dots-vertical" size={iconSizeSmall} />}>
        <LinearLayout applyPadding={true}>
          <CheckOptions schema={POPUP_MENU_OPTIONS} onSelectionChange={handlePopupMenuSelectionChange} />
        </LinearLayout>
      </Popup>
    </LinearLayout>
  }

  return (
    <ScreenLayout navigation={navigation} route={route} screenName="Menus Sample" customHeaderContent={customHeaderContent}>
      {/* all dialogs here */}
      <Portal>
        <Dialog
          title='Lorem Ipsum Stuff'
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          isVisible={showDialog}
          onSubmit={onSubmitDialog}
          onClose={() => setShowDialog(false)}
        >
          <Card.Content>
            <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Card.Content>
        </Dialog>
      </Portal>
      {/* main content here */}
      <Text variant="bodyMedium">Hello world</Text>
      <Button mode="contained" onPress={() => setShowDialog(true)}>
        Launch dialog
      </Button>
      <PickerInput value={pickerSelection} options={PICKER_ITEM_LIST} onChange={(v) => setPickerSelection(v)} />
    </ScreenLayout>
  );
}