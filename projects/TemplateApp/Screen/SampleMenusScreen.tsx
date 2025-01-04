import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { Card, IconButton, Portal } from 'react-native-paper';
import * as UI from '../../../Framework/Index/UI';
import * as Hook from '../../../Framework/Index/Hook';
import * as Const from '../../../Framework/Index/Const';
const _ = require('lodash');

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
    state: UI.OptionState.Unselected,
    children: {
      'red': { label: 'Red', state: UI.OptionState.Unselected },
      'blue': { label: 'Blue', state: UI.OptionState.Unselected },
      'green': { label: 'Green', state: UI.OptionState.Unselected },
    }
  },
  'class': {
    label: 'Class',
    state: UI.OptionState.Unselected,
    children: {
      'mammals': { 
        label: 'Mammals',
        state: UI.OptionState.Unselected,
        children: {
          'cat': { label: 'Cat', state: UI.OptionState.Unselected },
          'dog': { label: 'Dog', state: UI.OptionState.Unselected }
        }
      },
      'reptiles': { 
        label: 'Reptiles',
        state: UI.OptionState.Unselected,
        children: {
          'turtle': { label: 'Turtle', state: UI.OptionState.Unselected },
          'frog': { label: 'Frog', state: UI.OptionState.Unselected },
          'lizard': { label: 'Lizard', state: UI.OptionState.Unselected }
        }
      }
    }
  }
}

/**
 * Sample menus screen, demo various menu UI.
 */
const SampleMenusScreen: React.FC<UI.IScreenProps> = ({ navigation, route }) => {
  const searchBarRef = useRef<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [popupMenuSelection, setPopupMenuSelection] = useState<UI.OptionSchema>(_.cloneDeep(POPUP_MENU_OPTIONS));
  const [pickerSelection, setPickerSelection] = useState<string>('red');

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (searchBarRef.current) {
        searchBarRef.current.blur();
      }
    });
    return () => keyboardListener.remove();
  }, [searchBarRef]);

  function onSubmitDialog(): void {
    // some logic here
    setShowDialog(false);
  }

  function customHeaderContent(): JSX.Element {
    return <UI.HorizontalLayout reverse={true}>
      <UI.DropdownPopup triggerComp={<IconButton icon="dots-vertical" size={Const.iconSizeSmall} />}>
        <UI.CheckOption schema={popupMenuSelection} setSchema={setPopupMenuSelection} />
      </UI.DropdownPopup>
    </UI.HorizontalLayout>;
  }

  return (
    <UI.BasicActivity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Menus Sample">
      {/* all dialogs here */}
      <Portal>
        <UI.DialogPopup
          title='Lorem Ipsum Stuff'
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          isVisible={showDialog}
          onSubmit={onSubmitDialog}
          onClose={() => setShowDialog(false)}
        >
          <Card.Content>
            <UI.Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</UI.Text>
          </Card.Content>
        </UI.DialogPopup>
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