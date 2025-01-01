import React, { memo } from 'react';
import { Button as RNPButton } from 'react-native-paper';
import { IButtonProps, IIconButtonProps } from '../../../Index/PropType';

/**
 * Basic button.
 */
export const Button: React.FC<IButtonProps> = memo(({
  mode = 'contained',
  onPress = () => {},
  style = {},
  children
}) => {
  return (
    <RNPButton mode={mode} onPress={onPress} style={style}>
      {children}
    </RNPButton>
  );
});

/**
 * Icon button.
 */
export const IconButton: React.FC<IIconButtonProps> = memo(({
  icon = "camera",
  mode = "contained",
  onPress = () => {},
  style = {},
  children
}) => {
  return (
    <RNPButton icon={icon} mode={mode} onPress={onPress} style={style}>
      {children}
    </RNPButton>
  );
});