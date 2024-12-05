/**
 * Exposed to end users, export core functions or comps here.
 */

/**
 * activities: screens with presets for various activities
 */
export { default as BasicActivity } from '../UI/Core/Activity/BasicActivity';

/**
 * button: variations of buttons
 */
export { default as Button } from '../UI/Core/Button/Button';

/**
 * component: various components
 */
export { DividerComp } from '../UI/Core/Component/Decorator';

/**
 * containers: holds children; eg. children collapsible when triggered
 */
export { CollapsibleContainer, AccordionContainer } from '../UI/Core/Container/Collapsible';
export { default as TabsContainer } from '../UI/Core/Container/Tabs';

/**
 * dialogs: popup a menu on trigger; eg. dialog menu
 */
export { default as Dialog } from '../UI/Core/Dialog/Dialog';   // TODO: basic dialog
export { default as Popup } from '../UI/Core/Dialog/Popup'; // TODO: popup dialog

/**
 * display: display data/media
 */
export { default as ListDataDisplay } from '../UI/Core/Display/List';

/**
 * text:
 */
export { Text, HighlightText } from '../UI/Core/Text/Text';

/**
 * input: for entering and capturing info; eg. form input
 */
export { default as PickerInput } from '../UI/Core/Input/Picker';
export { default as TextInput } from '../UI/Core/Input/TextInput';

/**
 * layouts: parent view to contain other UI comps; eg. align children horizontally
 */
export { VerticalLayout, HorizontalLayout, GridLayout } from '../UI/Core/Layout/Layout';

/**
 * options: multiple options selection for data; eg. filtering
 */
export { default as CheckOption } from '../UI/Core/Option/CheckOption';
export { default as ChipOption } from '../UI/Core/Option/ChipOption';

/**
 * toggle: one option selectable; eg. check, radio, switch
 */
export { default as RadioGroupToggle } from '../UI/Core/Toggle/RadioGroupToggle';
export { default as SwitchToggle } from '../UI/Core/Toggle/SwitchToggle';