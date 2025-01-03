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