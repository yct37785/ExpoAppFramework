/******************************************************************************************************************
 * Default data keys
 *
 * Core keys shipped by the framework. These are always available.
 *
 * @property isDarkMode - whether dark mode is enabled
 * @property language - current language/locale
 ******************************************************************************************************************/
export type DefaultData = {
  isDarkMode: boolean;
  language: string;
};

// initial values for the built-in framework keys
export const defaultData: DefaultData = {
  isDarkMode: false,
  language: 'en',
};

/******************************************************************************************************************
 * Local data extensible type
 *
 * Extends the default data structure to support custom user-defined keys.
 * This allows apps to persist arbitrary additional values.
 ******************************************************************************************************************/
export type LocalData = DefaultData & Record<string, any>;
