import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Keyboard } from 'react-native';
const _ = require('lodash');
// TODO: remove RNP imports
import {
  Card, IconButton, Portal
} from 'react-native-paper';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';

/**
 * Const defines.
 */
const PICKER_ITEM_LIST = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

const POPUP_MENU_OPTIONS = {
  'colors': {
    label: 'Colors',
    children: {
      'red': { label: 'Red' },
      'blue': { label: 'Blue' },
      'green': { label: 'Green' },
    }
  },
  'class': {
    label: 'Class',
    children: {
      'mammals': { 
        label: 'Mammals',
        children: {
          'cat': { label: 'Cat' },
          'dog': { label: 'Dog' }
        }
      },
      'reptiles': { 
        label: 'Reptiles',
        children: {
          'turtle': { label: 'Turtle' },
          'frog': { label: 'Frog' },
          'lizard': { label: 'Lizard' }
        }
      }
    }
  }
};

/**
 * Sample menus screen, demo various menu UI.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - React Navigation provided object for navigating between screens.
 * @param {Object} props.route - React Navigation provided oobject containing route parameters.
 */
function SampleMenusScreen({ navigation, route, screenHeaderComp: ScreenHeaderComp }) {
  const searchBarRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [pickerSelection, setPickerSelection] = useState('red');

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

  const handleCheckOptionsChange = (updatedSchema, optionPath) => {
  };

  function customHeaderContent() {
    return <UI.VerticalLayout align='horizontal' reverse={true}>
      <UI.Popup triggerComp={<IconButton icon="dots-vertical" size={Const.iconSizeSmall} />}>
        <UI.VerticalLayout>
          <UI.CheckOption schema={POPUP_MENU_OPTIONS} onSelectionChange={handleCheckOptionsChange} />
        </UI.VerticalLayout>
      </UI.Popup>
    </UI.VerticalLayout>
  }

  return (
    <UI.BasicActivity navigation={navigation} route={route} title="Menus Sample" customHeaderContent={customHeaderContent}>
      {/* all dialogs here */}
      <Portal>
        <UI.Dialog
          title='Lorem Ipsum Stuff'
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          isVisible={showDialog}
          onSubmit={onSubmitDialog}
          onClose={() => setShowDialog(false)}
        >
          <Card.Content>
            <UI.Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </Card.Content>
        </UI.Dialog>
      </Portal>
      {/* main content here */}
      <UI.Text variant="bodyMedium">Hello world</UI.Text>
      <UI.Button mode="contained" onPress={() => setShowDialog(true)}>
        Launch dialog
      </UI.Button>
      <UI.PickerInput value={pickerSelection} options={PICKER_ITEM_LIST} onChange={(v) => setPickerSelection(v)} />
    </UI.BasicActivity>
  );
}

export default memo(SampleMenusScreen);