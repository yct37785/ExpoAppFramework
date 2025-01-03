import React, { memo } from 'react';
import { Button as RNPButton } from 'react-native-paper';

/**
 * button props
 * 
 * @param mode - RNP button modes.
 * @param onPress - On press handler.
 * @param style - Custom style.
 * @param children - The body content of this component.
 */
export interface IButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress?: () => void;
  style?: object;
  children: React.ReactNode;
};

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
 * IconButton props
 * 
 * @param icon - Icon name (default "camera").
 */
export interface IIconButtonProps extends IButtonProps {
  icon?: string;
};

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