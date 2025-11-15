import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, useTheme } from 'react-native-paper';
import * as Const from '../../../Const';
import { DialogType } from './Dialog.types';

/******************************************************************************************************************
 * Dialog implementation.
 ******************************************************************************************************************/
export const Dialog: DialogType = memo(
  ({
    title,
    subtitle,
    children,
    isVisible,
    onSubmit,
    onClose,
    dismissable = false,
    submitText = 'Confirm',
    closeText = 'Close',
    style,
  }) => {
    const theme = useTheme();

    const containerDynamic: StyleProp<ViewStyle> = {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness,
    };

    return (
      <Modal
        dismissable={dismissable}
        visible={isVisible}
        style={[styles.modal, style]}
      >
        <View style={[styles.container, containerDynamic]}>
          {title ? (
            <Text style={styles.title} variant="titleLarge">
              {title}
            </Text>
          ) : null}

          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}

          {children ?? <View style={styles.childrenFallback} />}

          <View style={styles.actionsWrapper}>
            {onClose && onSubmit && (
              <Card.Actions style={styles.actionsRow}>
                <Button onPress={onClose}>{closeText}</Button>
                <Button onPress={onSubmit}>{submitText}</Button>
              </Card.Actions>
            )}

            {onSubmit && !onClose && (
              <Card.Actions style={styles.actionsRow}>
                <Button onPress={onSubmit}>{submitText}</Button>
              </Card.Actions>
            )}

            {onClose && !onSubmit && (
              <Card.Actions style={styles.actionsRow}>
                <Button onPress={onClose}>{closeText}</Button>
              </Card.Actions>
            )}
          </View>
        </View>
      </Modal>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: Const.padSize4,
  },
  container: {
    minHeight: 160,
  },
  title: {
    padding: Const.padSize2,
  },
  subtitle: {
    marginHorizontal: Const.padSize2,
  },
  childrenFallback: {
    flex: 1,
  },
  actionsWrapper: {
    width: '100%',
    padding: Const.padSize,
  },
  actionsRow: {
    justifyContent: 'flex-end',
  },
});
