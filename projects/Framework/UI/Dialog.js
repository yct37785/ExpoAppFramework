import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { padSize05, padSize, padSize2, padSize4 } from '../Common/Common';
// UI
import { Modal, Button, Card, Text, useTheme } from 'react-native-paper';

/**
 * title: title of dialog
 * subtitle: heading below the title
 * children: children comp if any
 * isVisible: controls visiblity of dialog
 * onSubmit:
 * onClose:
 * dismissable: tapping outside can close dialog
 */
const Dialog = ({ title, subtitle, children, isVisible, onSubmit, onClose, dismissable = false,
   submitText = 'Confirm', closeText = 'Close' }) => {
  const theme = useTheme();

  return (
    <Modal dismissable={dismissable} visible={isVisible} style={{ marginHorizontal: padSize4 }}>
      <View style={{
        backgroundColor: theme.colors.surfaceVariant, borderRadius: theme.roundness,
        minHeight: 160
      }}>
        {/* title */}
        {title ? <Text style={{ padding: padSize2 }} variant="titleLarge">{title}</Text> : null}
        {/* subtitle */}
        {subtitle ? <Text style={{ marginHorizontal: padSize2 }}>{subtitle}</Text> : null}
        {/* comp */}
        {children ? children : <View style={{ flex: 1 }} />}
        {/* bottom */}
        <View style={{ width: '100%', padding: padSize }}>
          {/* both submit and close */}
          {onClose && onSubmit ? <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button onPress={onClose}>{closeText}</Button>
            <Button onPress={onSubmit}>{submitText}</Button>
          </Card.Actions> : null}
          {/* submit only */}
          {onSubmit && !onClose ? <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button onPress={onSubmit}>{submitText}</Button>
          </Card.Actions> : null}
          {/* close only */}
          {onClose && !onSubmit ? <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button onPress={onClose}>{closeText}</Button>
          </Card.Actions> : null}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Dialog);