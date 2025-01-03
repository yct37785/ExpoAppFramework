import React, { useState, useContext, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Switch } from 'react-native-paper';

/**
 * Props for the SwitchToggle component.
 *
 * @param value - The current value of the switch.
 * @param onValueChange - Callback function to handle selection changes.
 * @param style - Optional style for the container.
 */
export interface ISwitchToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * SwitchToggle component for rendering a switch with customizable behavior.
 */
const SwitchToggle: React.FC<ISwitchToggleProps> = ({
  value,
  onValueChange,
  style = {}
}) => {
  return (
    <View style={[{ alignItems: 'flex-start' }, style]}>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default memo(SwitchToggle);