import React, { useRef, memo } from 'react';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

/**
 * A general-purpose popup component that can accept any children to open as a dropdown.
 * PLEASE NOTE: triggerComp must not contain onPress callback which overwrites option callbacks
 *
 * @param {Object} props - Component props
 * @param {React.Element} props.triggerComp - The component to trigger the popup.
 * @param {boolean} [props.disabled=false] - Whether the popup trigger is disabled.
 * @param {Object} [props.style={}] - Additional style on base container.
 * @param {React.Element} props.children - The content to display inside the popup.
 * 
 * @returns {JSX.Element} The Popup component.
 */
function DropdownPopupComp({ 
  triggerComp, 
  disabled = false,
  style={},
  children
}) {
  const theme = useTheme();
  const menuRef = useRef(null);

  return (
    <Menu ref={menuRef} style={style}>
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

export default memo(DropdownPopupComp);
