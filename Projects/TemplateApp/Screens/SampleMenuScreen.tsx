import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Portal, Button, Card, IconButton } from 'react-native-paper';
import { ScreenProps } from '@screen';
import Activity from '@ui/Activity';
import { DialogPopup, DropdownPopup } from '@ui/Popup';
import { VerticalLayout, HorizontalLayout } from '@ui/Layout';
import { OptionState, OptionSchema, OptionProps } from '@ui/Option/OptionContainer';
import CheckOptions from '@ui/Option/CheckOptions';
import Const from '@const';
const _ = require('lodash');

const POPUP_MENU_OPTIONS = {
  'colors': {
    label: 'Colors',
    state: OptionState.Unselected,
    children: {
      'red': { label: 'Red', state: OptionState.Unselected },
      'blue': { label: 'Blue', state: OptionState.Unselected },
      'green': { label: 'Green', state: OptionState.Unselected },
    }
  },
  'class': {
    label: 'Class',
    state: OptionState.Unselected,
    children: {
      'mammals': { 
        label: 'Mammals',
        state: OptionState.Unselected,
        children: {
          'cat': { label: 'Cat', state: OptionState.Unselected },
          'dog': { label: 'Dog', state: OptionState.Unselected }
        }
      },
      'reptiles': { 
        label: 'Reptiles',
        state: OptionState.Unselected,
        children: {
          'turtle': { label: 'Turtle', state: OptionState.Unselected },
          'frog': { label: 'Frog', state: OptionState.Unselected },
          'lizard': { label: 'Lizard', state: OptionState.Unselected }
        }
      }
    }
  }
}

/**
 * sample menu screen
 */
const SampleMenuScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [popupMenuSelection, setPopupMenuSelection] = useState<OptionSchema>(_.cloneDeep(POPUP_MENU_OPTIONS));

  function onSubmitDialog(): void {
    // some logic here
    setShowDialog(false);
  }

  function customHeaderContent(): JSX.Element {
    return <HorizontalLayout align='flex-end'>
      <DropdownPopup triggerComp={<IconButton icon="dots-vertical" size={Const.iconSizeSmall} />}>
        <CheckOptions schema={popupMenuSelection} setSchema={setPopupMenuSelection} />
      </DropdownPopup>
    </HorizontalLayout>;
  }

  return (
    <Activity navigation={navigation} CustomHeaderComp={customHeaderContent} title="Menu Sample">
      {/* all dialogs here */}
      <Portal>
        <DialogPopup
          title='Lorem Ipsum Stuff'
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          isVisible={showDialog}
          onSubmit={onSubmitDialog}
          onClose={() => setShowDialog(false)}
        >
          <Card.Content>
            <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Card.Content>
        </DialogPopup>
      </Portal>
      {/* main content */}
      <VerticalLayout childMargin={Const.padSize} padding={Const.padSize}>
        <Text variant="bodyMedium">Hello world</Text>
        <Button mode="contained" onPress={() => setShowDialog(true)}>
          Launch dialog
        </Button>
      </VerticalLayout>
    </Activity>
  );
};

export default memo(SampleMenuScreen);