import React, { useRef, memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import * as Const from '../const';

type DialogProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  dismissable?: boolean;
  submitText?: string;
  closeText?: string;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Dialog component
 *
 * A customizable modal dialog component using react-native-paper's Modal.
 * Provides:
 * - Title and optional subtitle
 * - Flexible content area
 * - Optional close/submit buttons with customizable text
 *
 * @param title - title displayed at the top of the dialog
 * @param subtitle? - optional subtitle text displayed below the title
 * @param children? - content body of the dialog
 * @param isVisible? - controls dialog visibility
 * @param onSubmit? - optional callback for confirm/submit action
 * @param onClose? - optional callback for close/cancel action
 * @param dismissable? - if true, tapping outside closes the dialog
 * @param submitText? - custom text for the submit button (default: "Confirm")
 * @param closeText? - custom text for the close button (default: "Close")
 * @param style? - additional style applied to the modal container
 *
 * @returns JSX.Element
 ******************************************************************************************************************/
export const Dialog: React.FC<DialogProps> = memo(({
  title,
  subtitle,
  children,
  isVisible,
  onSubmit,
  onClose,
  dismissable = false,
  submitText = 'Confirm',
  closeText = 'Close',
  style = {},
}) => {
  const theme = useTheme();

  return (
    <Modal dismissable={dismissable} visible={isVisible} style={[{ marginHorizontal: Const.padSize4 }, style]}>
      <View
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.roundness,
          minHeight: 160,
        }}
      >
        {title && (
          <Text style={{ padding: Const.padSize2 }} variant="titleLarge">
            {title}
          </Text>
        )}
        {subtitle && <Text style={{ marginHorizontal: Const.padSize2 }}>{subtitle}</Text>}
        {children ? children : <View style={{ flex: 1 }} />}
        <View style={{ width: '100%', padding: Const.padSize }}>
          {onClose && onSubmit && (
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button onPress={onClose}>{closeText}</Button>
              <Button onPress={onSubmit}>{submitText}</Button>
            </Card.Actions>
          )}
          {onSubmit && !onClose && (
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button onPress={onSubmit}>{submitText}</Button>
            </Card.Actions>
          )}
          {onClose && !onSubmit && (
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button onPress={onClose}>{closeText}</Button>
            </Card.Actions>
          )}
        </View>
      </View>
    </Modal>
  );
});

type DropdownDialogProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Dropdown dialog component
 *
 * A general-purpose dropdown dialog component powered by react-native-popup-menu.
 * Provides:
 * - Customizable trigger component
 * - Disabled state support
 * - Flexible dropdown content area
 *
 * ⚠ NOTE: `triggerComp` must not contain its own onPress callback, as it may override option callbacks.
 * 
 * @param triggerComp - ReactNode element that triggers the dropdown when pressed
 * @param disabled? - if true, disables the trigger
 * @param style? - additional style for the container
 * @param children - content of the dropdown menu
 * 
 * @returns JSX.Element
 ******************************************************************************************************************/
export const DropdownDialog: React.FC<DropdownDialogProps> = memo(
  ({ triggerComp, disabled = false, style = {}, children }) => {
    const theme = useTheme();
    const menuRef = useRef<Menu | null>(null);

    return (
      <Menu ref={menuRef} style={style}>
        <MenuTrigger
          disabled={disabled}
          customStyles={{
            TriggerTouchableComponent: TouchableRipple,
          }}
        >
          {triggerComp}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: { backgroundColor: theme.colors.surfaceVariant },
          }}
        >
          {children}
        </MenuOptions>
      </Menu>
    );
  }
);
