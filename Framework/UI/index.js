/*****************************************************************************************
 * exposed to end users, export new UI components here
 * append Comp to name of each UI component for consistency, export without Comp appended
*****************************************************************************************/

// Collapsible.js
export { CollapsibleComp as Collapsible } from './Containers/Collapsible';
export { AccordionComp as Accordion } from './Containers/Collapsible';
// Dialog.js
export { default as Dialog } from './Dialogs/Dialog';
export { default as Popup } from './Dialogs/Popup';
export { default as Checkptions } from './Options/CheckOptions';
export { default as ChipOptions } from './Options/ChipOptions';
// Picker.js
export { default as Picker } from './Input/Picker';
// search bar todo
// TabBar.js
export { default as Tabs } from './Containers/Tabs';
// Text.js
export { highlightTextComp as highlightText } from './Display/Text';
// Layouts.js
export { LinearLayout, GridLayout, ScrollLayout } from './Layouts/Layouts';
// Containers.js
export { default as ScreenContainer } from './Layouts/Screen';