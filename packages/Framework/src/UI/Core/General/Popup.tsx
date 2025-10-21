import React, { useRef, memo, useMemo } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Touchable } from '../Interactive/Touchable';
import { PopupType } from './Popup.types';

/******************************************************************************************************************
 * Popup implementation.
 ******************************************************************************************************************/
export const Popup: PopupType = memo(
  ({ triggerComp, disabled = false, triggerContainerStyle, style, children }) => {
    const menuRef = useRef<Menu | null>(null);

    const triggerStyles = useMemo(
      () => ({
        TriggerTouchableComponent: Touchable,
        triggerOuterWrapper: triggerContainerStyle
      }),
      [triggerContainerStyle]
    );

    return (
      <Menu ref={menuRef} style={style}>
        <MenuTrigger disabled={disabled} customStyles={triggerStyles}>
          {triggerComp}
        </MenuTrigger>
        <MenuOptions>{children}</MenuOptions>
      </Menu>
    );
  }
);
