/*****************************************************************************************
 * exposed to end users, export new UI components here
 * append Comp to name of each UI component for consistency, export without Comp appended
*****************************************************************************************/

/**
 * containers: holds children; eg. children collapsible when triggered
 */
export { CollapsibleContainerMemo as CollapsibleContainer } from '../UI/Containers/Collapsible';
export { AccordionContainerMemo as AccordionContainer } from '../UI/Containers/Collapsible';
export { default as TabsContainer } from '../UI/Containers/Tabs';

/**
 * data display: display data in a consistent manner; eg. list of items
 */
export { default as ListDataDisplay } from '../UI/DataDisplay/List';

/**
 * dialogs: popup a menu on trigger; eg. dialog menu
 */
export { default as Dialog } from '../UI/Dialogs/Dialog';
export { default as Popup } from '../UI/Dialogs/Popup';

/**
 * text display: special utility comps to display text; eg. highlight search text
 */
export { HighlightTextDisplayMemo as HighlightTextDisplay } from '../UI/TextDisplay/Text';

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