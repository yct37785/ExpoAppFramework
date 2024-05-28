import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import Styles from '../../../Framework/Common/Styles';
// UI
import {
  useTheme, Text, Card, Button, Appbar,
  TouchableRipple, Searchbar, IconButton, FAB, Portal, Divider, Snackbar
} from 'react-native-paper';
import Dialog from '../../../Framework/UI/Dialog';
import Picker from '../../../Framework/UI/Picker';
import DropdownMenu from '../../../Framework/UI/DropdownMenu';
import DropdownCheckMenu from '../../../Framework/UI/DropdownCheckMenu';
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

/**
 * Display sample menus page
 */
export default function SampleMenusPage({ navigation, route }) {
  /**------------------------------------------------------------------------------------*
   * State
   *------------------------------------------------------------------------------------*/
  const theme = useTheme();
  const searchBarRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [pickerSelection, setPickerSelection] = useState('red');

  /**------------------------------------------------------------------------------------*
   * Init
   *------------------------------------------------------------------------------------*/

  /**------------------------------------------------------------------------------------*
   * Keyboard
   *------------------------------------------------------------------------------------*/
  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', (e) => {
      if (searchBarRef.current) {
        searchBarRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, [searchBarRef]);

  /**------------------------------------------------------------------------------------*
   * Utils
   *------------------------------------------------------------------------------------*/
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

  function onQuery(rawQuery) {
    setQuery(rawQuery);
    // process query logic here
  }

  /**------------------------------------------------------------------------------------*
   * Draw
   *------------------------------------------------------------------------------------*/
  return (
    <View style={Styles.contPage}>
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
      {/* appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Menus" >
        </Appbar.Content>
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
      </Appbar.Header>
      {/* main content here */}
      <View style={Styles.contPad}>
        <Text variant="bodyMedium">Hello world</Text>
      </View>
      <View style={Styles.contPad}>
        <Button mode="contained" onPress={() => setShowDialog(true)}>
          Launch dialog
        </Button>
      </View>
      <View style={Styles.contPad}>
        <Picker value={pickerSelection} options={PICKER_ITEM_LIST} onChange={(v) => setPickerSelection(v)} />
      </View>
    </View>
  );
}