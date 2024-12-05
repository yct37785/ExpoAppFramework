import React, { useEffect, useRef, memo } from 'react';
import { Button as RNPButton, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { textColorForDark, textColorForLight } from '../../../Index/Const';

/**
 * Basic button.
 * 
 * @param {Object} props - Component props.
 * @param {string} mode - RNP prop: text/outlined/contained/elevated/contained-tonal.
 * @param {Function} [props.onPress=()=>{}] - Callback function to handle on press event.
 * @param {Object} [props.style={}] - Additional style on base container.
 * @param {React.ReactNode} props.children - Content within button.
 * 
 * @returns {JSX.Element} The Button component.
 */
export const Button = memo(({
  mode="contained",
  onPress = () => { },
  style={},
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
 * 
 * @param {Object} props - Component props.
 * @param {string} icon - See icons directory: https://oblador.github.io/react-native-vector-icons/#MaterialCommunityIcons
 * @param {string} mode - RNP prop: text/outlined/contained/elevated/contained-tonal.
 * @param {Function} [props.onPress=()=>{}] - Callback function to handle on press event.
 * @param {Object} [props.style={}] - Additional style on base container.
 * @param {React.ReactNode} props.children - Content within button.
 * 
 * @returns {JSX.Element} The Button component.
 */
export const IconButton = memo(({
  icon = "camera",
  mode = "contained",
  onPress = () => { },
  style={},
  children
}) => {
  return (
    <RNPButton icon={icon} mode={mode} onPress={onPress} style={style}>
      {children}
    </RNPButton>
  );
});