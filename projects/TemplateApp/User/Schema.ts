/**
 * define schemas here, like default values of new user data etc.
 */
export interface IUserDataSchema {
  isDarkMode: boolean;
}

/**
 * local data
 */
export const LOCAL_DATA_VALUES: IUserDataSchema = {
  isDarkMode: false
}

/**
 * define screens
 */
export enum ScreenNames {
  Home = 'home',
  TextInputBtn = 'textInputBtn',
  Layouts = 'layouts',
  Containers = 'containers',
  Menus = 'menus',
  Empty = 'empty',
  DataDisplay = 'dataDisplay',
};

export const DEFAULT_SCREEN: ScreenNames = ScreenNames.Home;