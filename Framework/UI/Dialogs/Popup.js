/*****************************************************************************************
 * popup comp
*****************************************************************************************/
import React, { useRef, memo } from 'react';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import PropTypes from 'prop-types';

/**
 * A general-purpose popup component that can accept any children to open as a dropdown.
 * PLEASE NOTE: triggerComp must not contain onPress callback which overwrites option callbacks
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.Element} props.triggerComp - The component to trigger the popup.
 * @param {React.Element} props.children - The content to display inside the popup.
 * @param {boolean} [props.disabled=false] - Whether the popup trigger is disabled.
 */
function PopupComp({ triggerComp, children, disabled = false }) {
  const theme = useTheme();
  const menuRef = useRef(null);

  return (
    <Menu ref={menuRef}>
      <MenuTrigger disabled={disabled} customStyles={{
        TriggerTouchableComponent: TouchableRipple,
      }}>
        {triggerComp}
      </MenuTrigger>
      <MenuOptions customStyles={{ backgroundColor: theme.colors.surfaceVariant }}>
        {children}
      </MenuOptions>
    </Menu>
  );
}

export default memo(PopupComp);
