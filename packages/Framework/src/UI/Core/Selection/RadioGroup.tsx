import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { RadioGroupType } from './RadioGroup.types';

/******************************************************************************************************************
 * RadioGroup implementation.
 ******************************************************************************************************************/
export const RadioGroup: RadioGroupType = memo(
  ({ options, value, onValueChange, style }) => {
    return (
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        <View style={[styles.row, style]}>
          {Object.entries(options).map(([key, label]) => (
            <View key={key} style={styles.item}>
              <Text>{label}</Text>
              <RadioButton value={key} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
});
