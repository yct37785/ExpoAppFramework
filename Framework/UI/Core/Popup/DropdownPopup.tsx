import React, { useRef, memo, ReactNode } from 'react';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger, MenuOptionCustomStyle } from 'react-native-popup-menu';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Dropdown Popup Component Props
 * 
 * @param triggerComp - The component to trigger the popup. Any valid ReactNode.
 * @param disabled - Whether the popup trigger is disabled.
 * @param style - Additional style on the base container.
 * @param children - The content to display inside the popup.
 */
interface IDropdownPopupCompProps {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * A general-purpose popup component that can accept any children to open as a dropdown.
 * PLEASE NOTE: triggerComp must not contain onPress callback which overwrites option callbacks
 */
const DropdownPopupComp: React.FC<IDropdownPopupCompProps> = ({ 
  triggerComp, 
  disabled = false, 
  style = {}, 
  children 
}) => {
  const theme = useTheme();
  const menuRef = useRef<Menu | null>(null);

  return (
    <Menu ref={menuRef} style={style}>
      <MenuTrigger 
        disabled={disabled} 
        customStyles={{
          TriggerTouchableComponent: TouchableRipple,
        }}
      >
        {triggerComp}
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsWrapper: { backgroundColor: theme.colors.surfaceVariant }
      }}>
        {children}
      </MenuOptions>
    </Menu>
  );
};

export default memo(DropdownPopupComp);