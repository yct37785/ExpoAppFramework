import React, { useRef, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Touchable } from '../Interactive/Touchable';
import { PopupType } from './Popup.types';

/******************************************************************************************************************
 * Popup implementation.
 ******************************************************************************************************************/
export const Popup: PopupType = memo(
  ({ triggerComp, disabled = false, triggerContainerStyle, style, children }) => {
    const menuRef = useRef<Menu | null>(null);

    const triggerStyles = {
      TriggerTouchableComponent: Touchable,
      triggerOuterWrapper: triggerContainerStyle,
    };

    return (
      <Menu ref={menuRef} style={[styles.menu, style]}>
        <MenuTrigger disabled={disabled} customStyles={triggerStyles}>
          {triggerComp}
        </MenuTrigger>
        <MenuOptions>{children}</MenuOptions>
      </Menu>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  menu: {
    justifyContent: 'center',
  },
});
