import React, { useRef, memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

type PopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Popup component
 *
 * A general-purpose popup component powered by react-native-popup-menu.
 * Provides:
 * - Customizable trigger component
 * - Disabled state support
 * - Flexible popup content area
 *
 * ⚠ NOTE: `triggerComp` must not contain its own onPress callback, as it may override option callbacks.
 * 
 * @param triggerComp - ReactNode element that triggers the popup when pressed
 * @param disabled? - if true, disables the trigger
 * @param style? - additional style for the container
 * @param children - content of the popup menu
 * 
 * @returns JSX.Element
 ******************************************************************************************************************/
export const Popup: React.FC<PopupProps> = memo(
  ({ triggerComp, disabled = false, style = {}, children }) => {
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
        <MenuOptions
          customStyles={{
            optionsWrapper: { backgroundColor: theme.colors.surfaceVariant },
          }}
        >
          {children}
        </MenuOptions>
      </Menu>
    );
  }
);
