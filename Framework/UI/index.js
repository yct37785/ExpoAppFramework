/*****************************************************************************************
 * exposed to end users, export new UI components here
 * append Comp to name of each UI component for consistency, export without Comp appended
*****************************************************************************************/

/**
 * containers: holds children; eg. children collapsible when triggered
 */
export { CollapsibleContainerMemo as CollapsibleContainer } from './Containers/Collapsible';
export { AccordionContainerMemo as AccordionContainer } from './Containers/Collapsible';
export { default as TabsContainer } from './Containers/Tabs';

/**
 * data display: display data in a consistent manner; eg. list of items
 */
export { default as ListDataDisplay } from './DataDisplay/List';

/**
 * dialogs: popup a menu on trigger; eg. dialog menu
 */
export { default as Dialog } from './Dialogs/Dialog';
export { default as Popup } from './Dialogs/Popup';

/**
 * text display: special utility comps to display text; eg. highlight search text
 */
export { HighlightTextDisplayMemo as HighlightTextDisplay } from './TextDisplay/Text';

/**
 * input: for entering and capturing info; eg. form input
 */
export { default as PickerInput } from './Input/Picker';
export { default as TextInput } from './Input/TextInput';

/**
 * layouts: parent view to contain other UI comps; eg. align children horizontally
 */
export { LinearLayoutMemo as LinearLayout } from './Layouts/Layouts';
export { GridLayoutMemo as GridLayout } from './Layouts/Layouts';
export { default as ScreenLayout } from './Layouts/ScreenLayout';

/**
 * options: option selection for data; eg. filtering
 */
export { default as CheckOptions } from './Options/CheckOptions';
export { default as ChipOptions } from './Options/ChipOptions';