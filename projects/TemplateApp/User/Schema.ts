/**
 * Define schemas here, like default values of new user data etc.
 */
export interface IUserDataSchema {
  isDarkMode: boolean;
}

export interface IScreenNamesSchema {
  textInputBtn: string;
  layouts: string;
  containers: string;
  menus: string;
  empty: string;
  dataDisplay: string;
}

/**
 * local data
 */
export const LOCAL_DATA_VALUES: IUserDataSchema = {
  isDarkMode: false
};

/**
 * screen display names
 */
export const SAMPLE_SCREEN_NAMES: IScreenNamesSchema = {
  textInputBtn: "text input button example",
  layouts: "layouts example",
  containers: "containers example",
  menus: "menus example",
  empty: "empty example",
  dataDisplay: "data display example"
};
