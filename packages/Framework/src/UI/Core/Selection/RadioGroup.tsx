import React, { memo } from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { RadioGroupType } from './RadioGroup.types';

/******************************************************************************************************************
 * RadioGroup implementation.
 ******************************************************************************************************************/
export const RadioGroup: RadioGroupType = memo(({
  options,
  value,
  onValueChange,
  style = {},
}) => {
  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={[{ flexDirection: 'row' }, style]}>
        {Object.entries(options).map(([key, label], index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
            <Text>{label}</Text>
            <RadioButton value={key} />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
});
