import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Dialog props.
 * 
 * @property title        - Title text displayed at the top
 * @property subtitle     - Optional subtitle text displayed below the title
 * @property children?    - Body content of the dialog
 * @property isVisible    - Whether the dialog is visible
 * @property onSubmit?    - Callback for confirm/submit action
 * @property onClose?     - Callback for close/cancel action
 * @property dismissable? - Whether tapping outside dismisses the dialog
 * @property submitText?  - Custom text for the submit button (default: 'confirm')
 * @property closeText?   - Custom text for the close button (default: 'close')
 * @property style?       - Additional style for the modal container
 ******************************************************************************************************************/
export type DialogProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  dismissable?: boolean;
  submitText?: string;
  closeText?: string;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a customizable modal dialog using react-native-paper's Modal.
 * Provides title, optional subtitle, flexible content, and optional close/submit actions.
 *
 * @usage
 * ```tsx
 * <Dialog
 *   title='delete item'
 *   subtitle='are you sure?'
 *   isVisible={open}
 *   onSubmit={handleDelete}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 ******************************************************************************************************************/
export type Dialog = React.FC<DialogProps>;
