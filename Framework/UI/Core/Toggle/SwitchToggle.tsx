import React, { useState, useContext, memo } from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-paper';

/**
 * Component for rendering one set of radio group
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.value - current value of the switch.
 * @param {Function} props.onValueChange - Callback function to handle selection changes.
 * @param {Object} [props.style={}] - Additional style on base container.
 * 
 * @returns {JSX.Element} The SwitchToggle component.
 */
const SwitchToggle = ({
  value,
  onValueChange,
  style={}
}) => {
  return (
    <View style={[{ alignItems: 'flex-start' }, style]}>
      <Switch value={value} onValueChange={(newValue) => onValueChange(newValue)} />
    </View>
  );
};

export default memo(SwitchToggle);