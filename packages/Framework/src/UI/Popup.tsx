import React, { useRef, memo, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, TouchableRipple, useTheme } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

/******************************************************************************************************************
 * Popup props.
 * 
 * @property triggerComp  - Element that triggers the popup
 * @property disabled?    - Whether the trigger is disabled
 * @property style?       - Optional container style
 * @property children     - Content of the popup menu
 ******************************************************************************************************************/
type PopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * Render a general-purpose popup menu using react-native-popup-menu.
 * Provides a trigger component and flexible popup content area.
 *
 * NOTE: triggerComp must not include its own onPress, as it can override option callbacks.
 *
 * @param props - Refer to PopupProps
 *
 * @usage
 * ```tsx
 * <Popup triggerComp={<IconButton icon="dots-vertical" />}>
 *   <MenuOption onSelect={doSomething} text="option a" />
 *   <MenuOption onSelect={doOther} text="option b" />
 * </Popup>
 * ```
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
