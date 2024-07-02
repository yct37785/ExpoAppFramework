/*****************************************************************************************
 * exposed to end users, export new UI components here
*****************************************************************************************/

/**
 * containers: holds children; eg. children collapsible when triggered
 */
export { CollapsibleContainerMemo as CollapsibleContainer } from '../UI/Containers/Collapsible';
export { AccordionContainerMemo as AccordionContainer } from '../UI/Containers/Collapsible';
export { default as TabsContainer } from '../UI/Containers/Tabs';

/**
 * dialogs: popup a menu on trigger; eg. dialog menu
 */
export { default as Dialog } from '../UI/Dialogs/Dialog';
export { default as Popup } from '../UI/Dialogs/Popup';

/**
 * display: special utility comps to display data; eg. text
 */
export { default as ListDataDisplay } from '../UI/Display/List';
export { HighlightTextDisplayMemo as HighlightTextDisplay } from '../UI/Display/Text';

/**
 * input: for entering and capturing info; eg. form input
 */
export { default as PickerInput } from '../UI/Input/Picker';
export { default as TextInput } from '../UI/Input/TextInput';

/**
 * layouts: parent view to contain other UI comps; eg. align children horizontally
 */
export { LinearLayoutMemo as LinearLayout } from '../UI/Layouts/Layouts';
export { GridLayoutMemo as GridLayout } from '../UI/Layouts/Layouts';
export { default as ScreenLayout } from '../UI/Layouts/ScreenLayout';

/**
 * options: option selection for data; eg. filtering
 */
export { default as CheckOptions } from '../UI/Options/CheckOptions';
export { default as ChipOptions } from '../UI/Options/ChipOptions';