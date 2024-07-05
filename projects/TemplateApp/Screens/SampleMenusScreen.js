/***************************************************************************************
* showcase menu UI elements
***************************************************************************************/
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Keyboard } from 'react-native';
const _ = require('lodash');
// UI
import {
  Card, Button, IconButton, Portal
} from 'react-native-paper';
import { LinearLayout, ScreenLayout, Dialog, Popup, PickerInput, CheckOptions, Text } from '../../../Framework/Index/UI';
import { iconSizeSmall } from '../../../Framework/Index/CommonVals';
// const
const PICKER_ITEM_LIST = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];
const POPUP_MENU_OPTIONS = {
  'colors': {
    label: 'Colors',
    state: 0,
    children: {
      'red': { label: 'Red', state: 0 },
      'blue': { label: 'Blue', state: 0 },
      'green': { label: 'Green', state: 0 },
    }
  },
  'class': {
    label: 'Class',
    state: 0,
    children: {
      'mammals': { 
        label: 'Mammals',
        state: 0,
        children: {
          'cat': { label: 'Cat', state: 0 },
          'dog': { label: 'Dog', state: 0 }
        }
      },
      'reptiles': { 
        label: 'Reptiles',
        state: 0,
        children: {
          'turtle': { label: 'Turtle', state: 0 },
          'frog': { label: 'Frog', state: 0 },
          'lizard': { label: 'Lizard', state: 0 }
        }
      }
    }
  }
};

/**
 * Display sample menus screen
 */
export default function SampleMenusScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const searchBarRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [pickerSelection, setPickerSelection] = useState('red');
  const [checkOptionsSchema, setCheckOptionsSchema] = useState( _.cloneDeep(POPUP_MENU_OPTIONS));

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

  const handleCheckOptionsChange = (updatedCheckOptionsSchema) => {
    setCheckOptionsSchema(updatedCheckOptionsSchema);
  };

  function customHeaderContent() {
    return <LinearLayout align='horizontal' reverse={true}>
      <Popup triggerComp={<IconButton icon="dots-vertical" size={iconSizeSmall} />}>
        <LinearLayout applyPadding={true}>
          <CheckOptions schema={checkOptionsSchema} onSelectionChange={handleCheckOptionsChange} />
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