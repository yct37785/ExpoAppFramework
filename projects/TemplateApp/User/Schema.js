/**
 * Define schemas here, like default values of new user data etc.
 */

/**
 * new user data schema
 */
export const LOCAL_DATA_SCHEMA = {
  system: {
    trackers: {
      loginCount: 0
    },
    settings: {
      isDarkMode: true
    }
  }
};

/**
 * screen display names
 */
export const SAMPLE_SCREENS = {
  textInputBtn: "text input button example",
  layouts: "layouts example",
  containers: "containers example",
  menus: "menus example",
  empty: "empty example",
  dataDisplay: "data display example",
  localData: "local data management example",
};