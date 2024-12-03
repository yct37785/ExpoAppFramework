/*****************************************************************************************
 * universal button
*****************************************************************************************/
import React, { useEffect, useRef, memo } from 'react';
import { Button as RNPButton } from 'react-native-paper';

/**
 * Button
 * 
 * @param {Object} props - Component props.
 * @param {string} mode - RNP prop: text/outlined/contained/elevated/contained-tonal.
 * @param {Function} [props.onPress=()=>{}] - Callback function to handle on press event.
 * @param {React.ReactNode} props.children - Content within button.
 * 
 * @returns {JSX.Element} The Button component.
 */
const Button = ({
  mode="contained",
  onPress = () => { },
  children
}) => {
  return (
    <RNPButton mode={mode} onPress={onPress}>
      {children}
    </RNPButton>
  );
};

export default memo(Button);