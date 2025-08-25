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
