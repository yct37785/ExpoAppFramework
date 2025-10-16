import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Popup props.
 *
 * @property triggerComp - Element that triggers the popup (do not attach onPress here).
 * @property disabled?   - Whether the trigger is disabled.
 * @property style?      - Optional container style passed to <Menu>.
 * @property children    - Content of the popup menu (e.g., <MenuOption/> items).
 ******************************************************************************************************************/
export type PopupProps = {
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
export type Popup = React.FC<PopupProps>;
