import React, { useContext, useState, useEffect, useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import { Text, Portal, Button, Card, IconButton } from 'react-native-paper';
import { ScreenProps } from '@screen';
import Activity from '@ui/Activity';
import { DialogPopup, DropdownPopup } from '@ui/Popup';
import { VerticalLayout, HorizontalLayout } from '@ui/Layout';
import Const from '@const';
const _ = require('lodash');

/**
 * sample menu screen
 */
const SampleMenuScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  function onSubmitDialog(): void {
    // some logic here
    setShowDialog(false);
  }

  function customHeaderContent(): JSX.Element {
    return <HorizontalLayout reverse={true}>
      <DropdownPopup triggerComp={<IconButton icon="dots-vertical" size={Const.iconSizeSmall} />}>
        <Text>Something</Text>
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