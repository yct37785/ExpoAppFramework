import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Modal, Button, Card, useTheme } from 'react-native-paper';
import { Text } from '../Text/Text';
import { padSize, padSize2, padSize4 } from '../../../Index/Const';

/**
 * dialog popup component props
 * 
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
export interface IDialogPopupCompProps {
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
 * A customizable dialog component.
 */
const DialogPopupComp: React.FC<IDialogPopupCompProps> = ({
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
    <Modal dismissable={dismissable} visible={isVisible} style={[{ marginHorizontal: padSize4 }, style]}>
      <View style={{
        backgroundColor: theme.colors.surfaceVariant, 
        borderRadius: theme.roundness,
        minHeight: 160,
      }}>
        {title && <Text style={{ padding: padSize2 }} variant="titleLarge">{title}</Text>}
        {subtitle && <Text style={{ marginHorizontal: padSize2 }}>{subtitle}</Text>}
        {children ? children : <View style={{ flex: 1 }} />}
        <View style={{ width: '100%', padding: padSize }}>
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
}

export default memo(DialogPopupComp);
