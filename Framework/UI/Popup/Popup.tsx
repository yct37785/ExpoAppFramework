import React, { useRef, memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Const from '../../Const';

/**
 * @param title - Title of the dialog.
 * @param subtitle - Subtitle or heading below the title.
 * @param children - Child components to render inside the dialog.
 * @param isVisible - Controls the visibility of the dialog.
 * @param onSubmit - Callback for submit action.
 * @param onClose - Callback for close action.
 * @param dismissable - If true, tapping outside closes the dialog.
 * @param submitText - Text for the submit button.
 * @param closeText - Text for the close button.
 * @param style - Additional style for the container.
 */
type DialogPopupProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isVisible: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  dismissable?: boolean;
  submitText?: string;
  closeText?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * a customizable dialog component
 */
export const DialogPopup: React.FC<DialogPopupProps> = memo(({
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
      <View style={{
        backgroundColor: theme.colors.surfaceVariant, 
        borderRadius: theme.roundness,
        minHeight: 160,
      }}>
        {title && <Text style={{ padding: Const.padSize2 }} variant="titleLarge">{title}</Text>}
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


/**
 * @param triggerComp - The component to trigger the popup. Any valid ReactNode.
 * @param disabled - Whether the popup trigger is disabled.
 * @param style - Additional style on the base container.
 * @param children - The content to display inside the popup.
 */
type DropdownPopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * a general-purpose popup component that can accept any children to open as a dropdown
 * PLEASE NOTE: triggerComp must not contain onPress callback which overwrites option callbacks!
 */
export const DropdownPopup: React.FC<DropdownPopupProps> = memo(({ 
  triggerComp, 
  disabled = false, 
  style = {}, 
  children 
}) => {
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
      <MenuOptions customStyles={{
        optionsWrapper: { backgroundColor: theme.colors.surfaceVariant }
      }}>
        {children}
      </MenuOptions>
    </Menu>
  );
});