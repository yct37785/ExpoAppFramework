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
// DropdownCheckMenu.js
export { default as DropdownCheckMenu } from './Menus/Dropdowns/DropdownCheckMenu';
// DropdownMenu.js
export { default as DropdownMenu } from './Menus/Dropdowns/DropdownMenu';
// OptionsMenu.js
export { default as OptionsMenu } from './Menus/OptionsMenu';
// Options.js
export { ChipsContainerComp as ChipsContainer } from './Menus/Options';
// Picker.js
export { default as Picker } from './Menus/Dropdowns/Picker';
// search bar todo
// TabBar.js
export { default as Tabs } from './Containers/Tabs';
// Text.js
export { highlightTextComp as highlightText } from './Display/Text';
// Layouts.js
export { LinearLayout, GridLayout, ScrollLayout } from './Layouts/Layouts';
// Containers.js
export { default as ScreenContainer } from './Layouts/Screen';