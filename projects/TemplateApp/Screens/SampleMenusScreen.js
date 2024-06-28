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
import { ScreenContainer, LinearLayout, Dialog, Picker, DropdownMenu, DropdownCheckMenu, OptionsMenu } from '../../../Framework/UI/index';
// const
const PICKER_ITEM_LIST = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];
const DROPDOWN_ITEM_LIST = [
  { label: 'Bookmark', value: 'bookmark' },
  { label: 'Something', value: 'something' },
  { label: 'Delete', value: 'delete', color: 'red' },
];
const schema = [
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
    label: 'Shapes',
    value: 'shapes',
    children: [
      { label: 'Circle', value: 'circle' },
      { label: 'Square', value: 'square' },
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
  const [selectedOptions, setSelectedOptions] = useState({});

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

  function onDropdownMenuSelected(value) {
    console.log('Drowndown menu selection: ' + value);
  }

  function onDropdownCheckMenuSelected(value, idx, selected) {
    console.log('Dropdown check menu selection: ' + JSON.stringify(Object.keys(selected)));
  }

  const handleSelectionChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  function onQuery(rawQuery) {
    setQuery(rawQuery);
    // process query logic here
  }

  function customHeaderContent() {
    return <LinearLayout align='horizontal'>
      <DropdownMenu
        triggerComp={<IconButton
          icon="dots-vertical"
          size={20}
        />}
        options={DROPDOWN_ITEM_LIST}
        onPress={onDropdownMenuSelected} />
      <DropdownCheckMenu
        triggerComp={<IconButton
          icon="dots-vertical"
          size={20}
        />}
        options={PICKER_ITEM_LIST}
        onPress={onDropdownCheckMenuSelected} />
    </LinearLayout>
  }

  return (
    <ScreenContainer navigation={navigation} route={route} screenName="Menus Sample" customHeaderContent={customHeaderContent}>
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
      <Picker value={pickerSelection} options={PICKER_ITEM_LIST} onChange={(v) => setPickerSelection(v)} />
      <OptionsMenu schema={schema} onSelectionChange={handleSelectionChange} />
    </ScreenContainer>
  );
}