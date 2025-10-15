import React, { useRef, memo, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Touchable } from './Interactive/Touchable';

/******************************************************************************************************************
 * Popup props.
 *
 * @property triggerComp - Element that triggers the popup (do not attach onPress here).
 * @property disabled?   - Whether the trigger is disabled.
 * @property style?      - Optional container style passed to <Menu>.
 * @property children    - Content of the popup menu (e.g., <MenuOption/> items).
 ******************************************************************************************************************/
type PopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * General-purpose popup menu using react-native-popup-menu.
 * - Trigger uses our `Touchable` for consistent feedback (animated opacity + native ripple on Android).
 * - Menu background is theme-aware with a safe fallback chain for dark/light parity.
 *
 * @usage
 * ```tsx
 * <Popup triggerComp={<IconButton icon="dots-vertical" />}>
 *   <MenuOption onSelect={doSomething} text="Option A" />
 *   <MenuOption onSelect={doOther} text="Option B" />
 * </Popup>
 * ```
 ******************************************************************************************************************/
export const Popup: React.FC<PopupProps> = memo(
  ({ triggerComp, disabled = false, style, children }) => {
    const menuRef = useRef<Menu | null>(null);

    const triggerStyles = useMemo(
      () => ({ TriggerTouchableComponent: Touchable }),
      []
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
