import React, { useRef, memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, TouchableRipple, useTheme } from 'react-native-paper';
import * as Const from '../Const';

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
 * Render a customizable modal dialog using react-native-paper's Modal.
 * Provides title, optional subtitle, flexible content, and optional close/submit actions.
 *
 * @param props - Dialog props:
 *   - title: string          - Title text displayed at the top
 *   - subtitle?: string      - Optional subtitle text displayed below the title
 *   - children?: ReactNode   - Body content of the dialog
 *   - isVisible: boolean     - Whether the dialog is visible
 *   - onSubmit?: fn          - Callback for confirm/submit action
 *   - onClose?: fn           - Callback for close/cancel action
 *   - dismissable?: boolean  - Whether tapping outside dismisses the dialog
 *   - submitText?: string    - Custom text for the submit button (default: "confirm")
 *   - closeText?: string     - Custom text for the close button (default: "close")
 *   - style?: StyleProp<ViewStyle> - Additional style for the modal container
 *
 * @usage
 * ```tsx
 * <Dialog
 *   title="delete item"
 *   subtitle="are you sure?"
 *   isVisible={open}
 *   onSubmit={handleDelete}
 *   onClose={() => setOpen(false)}
 * />
 * ```
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
