import React, { memo } from 'react';
import { View } from 'react-native';
import { padSize, padSize2, padSize4 } from '../../Index/Const';
import { Modal, Button, Card, useTheme } from 'react-native-paper';
import { Text } from '../Text/Text';

/**
 * A customizable dialog component.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the dialog.
 * @param {string} props.subtitle - The subtitle or heading below the title.
 * @param {React.ReactNode} props.children - Children components to be rendered inside the dialog.
 * @param {boolean} props.isVisible - Controls the visibility of the dialog.
 * @param {Function} props.onSubmit - Callback function to handle submit action.
 * @param {Function} props.onClose - Callback function to handle close action.
 * @param {boolean} [props.dismissable=false] - If true, tapping outside the dialog will close it.
 * @param {string} [props.submitText='Confirm'] - Text for the submit button.
 * @param {string} [props.closeText='Close'] - Text for the close button.
 * 
 * @returns {JSX.Element} The Dialog component.
 */
const DialogComp = ({ 
  title, 
  subtitle, 
  children, 
  isVisible, 
  onSubmit, 
  onClose, 
  dismissable = false, 
  submitText = 'Confirm', 
  closeText = 'Close' 
}) => {
  const theme = useTheme();

  return (
    <Modal dismissable={dismissable} visible={isVisible} style={{ marginHorizontal: padSize4 }}>
      <View style={{
        backgroundColor: theme.colors.surfaceVariant, 
        borderRadius: theme.roundness,
        minHeight: 160
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
};

export default memo(DialogComp);
