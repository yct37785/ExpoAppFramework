import React, { memo } from 'react';
import { View } from 'react-native';
import { Text, Modal, Button, Card, useTheme } from 'react-native-paper';
import * as Const from '../../Const';
import { DialogType } from './Dialog.types';

/******************************************************************************************************************
 * Dialog implementation.
 ******************************************************************************************************************/
export const Dialog: DialogType = memo(({
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
          <Text style={{ padding: Const.padSize2 }} variant='titleLarge'>
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
