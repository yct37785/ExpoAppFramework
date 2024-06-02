/*****************************************************************************************
 * Common use case utilities
*****************************************************************************************/

/**
 * Delays execution by a specified amount of time.
 * 
 * @param {number} t - The time to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delayPromise = t => new Promise(resolve => setTimeout(resolve, t));

/**
 * Clamps a number between a minimum and maximum value.
 * 
 * @param {number} num - The number to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The clamped value.
 */
export function minMax(num, min, max) {
  return Math.max(Math.min(num, max), 0);
}

/**
 * Sorts an array of objects using the bubble sort algorithm based on a value from the objects.
 * 
 * @param {Array<Object>} inputArr - The array of objects to sort.
 * @param {Function} getValueFromObj - Function to extract the value from an object for comparison.
 * @returns {Array<Object>} The sorted array.
 */
export function bubbleSortObjects(inputArr, getValueFromObj) {
  let len = inputArr.length;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len - 1; i++) {
      if (getValueFromObj(inputArr[i]) > getValueFromObj(inputArr[i + 1])) {
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        checked = true;
      }
    }
  } while (checked);
  return inputArr;
}

/**
 * Converts an epoch time to a string in DD/MM/YY format.
 * 
 * @param {number} epoch - The epoch time to convert.
 * @returns {string} The formatted date string.
 */
export function epochToDDMMYY(epoch) {
  const dateObj = new Date(epoch);
  const yr = (dateObj.getFullYear() % 2000).toString().padStart(2, '0');
  const mth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${day}/${mth}/${yr}`;
}

/**
 * Gets the current date and time in DD-MM-YYYY-HHMMSS format.
 * 
 * @returns {string} The formatted date and time string.
 */
export function get_ddmmyyyy_hhmmss() {
  const d = new Date();
  const str = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}-${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}`;
  return str;
}

/**
 * Converts milliseconds to a string in HH:MM:SS format.
 * 
 * @param {number} ms - The time in milliseconds.
 * @returns {string} The formatted time string.
 */
export function ms_to_hhmmss(ms) {
  const hr = ms / (3600 * 1000);
  const min = Math.floor(ms % (3600 * 1000) / (1000 * 60));
  const s = Math.floor(ms % (60 * 1000) / 1000);
  const str = `${hr.toFixed(0).padStart(2, '0')}:${min.toFixed(0).padStart(2, '0')}:${s.toFixed(0).padStart(2, '0')}`;
  return str;
}

/**
 * Removes all characters from a string that are greater than 2 bytes.
 * 
 * @param {string} str - The string to process.
 * @returns {string} The processed string with characters greater than 2 bytes removed.
 */
export function strToUtf8(str) {
  // https://stackoverflow.com/questions/31698871/er-truncated-wrong-value-for-field-on-saving-some-strings-to-mysql
  return str.replace(/[\u0800-\uFFFF]/g, '');
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeStr(str) {
  if (str.length < 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts an object to a key-value array, only 1 layer deep.
 * 
 * @param {Object} obj - The object to convert.
 * @returns {Array<Array<string>>} An array of key-value pairs.
 */
export function objToKeyValueArr(obj) {
  const newArr = [];
  for (key in obj) {
    newArr.push([key, JSON.stringify(obj[key])]);
  }
  return newArr;
}