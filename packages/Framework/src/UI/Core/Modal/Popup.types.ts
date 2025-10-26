import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Popup props.
 *
 * @property triggerComp    - Element that triggers the popup (do not attach onPress here).
 * @property disabled?      - Whether the trigger is disabled.
 * @property triggerContainerStyle? - Optional style for the trigger element used by the trigger.
 * @property style?         - Optional container style passed to <Menu>.
 * @property children       - Content of the popup menu (e.g., <MenuOption/> items).
 ******************************************************************************************************************/
export type PopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  triggerContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * A contextual floating menu or overlay triggered by a user action such as a button press.
 *
 * @usage
 * ```tsx
 * <Popup triggerComp={<IconButton icon="dots-vertical" />}>
 *   <MenuOption onSelect={doSomething} text="Option A" />
 *   <MenuOption onSelect={doOther} text="Option B" />
 * </Popup>
 * ```
 ******************************************************************************************************************/
export type PopupType = React.FC<PopupProps>;
