/*****************************************************************************************
 * exposed to end users, export new UI components here
*****************************************************************************************/

/**
 * activities: screens with presets for various activities
 */
export { default as BasicActivity } from '../UI/Activities/BasicActivity';

/**
 * button: variations of buttons
 */
export { default as Button } from '../UI/Button/Button';

/**
 * component: various components
 */
export { DividerComp } from '../UI/Component/Decorators';

/**
 * containers: holds children; eg. children collapsible when triggered
 */
export { CollapsibleContainer, AccordionContainer } from '../UI/Containers/Collapsible';
export { default as TabsContainer } from '../UI/Containers/Tabs';

/**
 * dialogs: popup a menu on trigger; eg. dialog menu
 */
export { default as Dialog } from '../UI/Dialogs/Dialog';   // basic dialog
export { default as Popup } from '../UI/Dialogs/Popup'; // popup dialog

/**
 * display: display data/media
 */
export { default as ListDataDisplay } from '../UI/Display/List';

/**
 * text:
 */
export { Text, HighlightText } from '../UI/Text/Text';

/**
 * input: for entering and capturing info; eg. form input
 */
export { default as PickerInput } from '../UI/Input/Picker';
export { default as TextInput } from '../UI/Input/TextInput';

/**
 * layouts: parent view to contain other UI comps; eg. align children horizontally
 */
export { VerticalLayout, HorizontalLayout, GridLayout } from '../UI/Layouts/Layouts';

/**
 * options: multiple options selection for data; eg. filtering
 */
export { default as CheckOptions } from '../UI/Options/CheckOptions';
export { default as ChipOptions } from '../UI/Options/ChipOptions';

/**
 * toggle: one option selectable; eg. check, radio, switch
 */
export { default as RadioGroupToggle } from '../UI/Toggle/RadioGroupToggle';
export { default as SwitchToggle } from '../UI/Toggle/SwitchToggle';