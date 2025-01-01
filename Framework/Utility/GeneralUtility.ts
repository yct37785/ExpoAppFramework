/**
 * Delays execution by a specified amount of time.
 * 
 * @param t - The time to delay in milliseconds.
 * 
 * @returns A promise that resolves after the specified delay.
 */
export const delayPromise = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t));

/**
 * Clamps a number between a minimum and maximum value.
 * 
 * @param num - The number to clamp.
 * @param min - The minimum value.
 * @param  max - The maximum value.
 * 
 * @returns The clamped value.
 */
export function minMax(num: number, min: number, max: number): number {
  return Math.max(Math.min(num, max), min);
}

/**
 * Sorts an array of objects using the bubble sort algorithm based on a value from the objects.
 * 
 * @param inputArr - The array of objects to sort.
 * @param getValueFromObj - Function to extract the value from an object for comparison.
 * 
 * @returns The sorted array.
 */
export function bubbleSortObjects<T>(inputArr: T[], getValueFromObj: (obj: T) => number): T[] {
  let len = inputArr.length;
  let checked: boolean;
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
 * @param epoch - The epoch time to convert.
 * 
 * @returns The formatted date string.
 */
export function epochToDDMMYY(epoch: number): string {
  const dateObj = new Date(epoch);
  const yr = (dateObj.getFullYear() % 2000).toString().padStart(2, '0');
  const mth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${day}/${mth}/${yr}`;
}

/**
 * Gets the current date and time in DD-MM-YYYY-HHMMSS format.
 * 
 * @returns The formatted date and time string.
 */
export function get_ddmmyyyy_hhmmss(): string {
  const d = new Date();
  const str = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}-${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}`;
  return str;
}

/**
 * Converts milliseconds to a string in HH:MM:SS format.
 * 
 * @param ms - The time in milliseconds.
 * 
 * @returns The formatted time string.
 */
export function ms_to_hhmmss(ms: number): string {
  const hr = ms / (3600 * 1000);
  const min = Math.floor(ms % (3600 * 1000) / (1000 * 60));
  const s = Math.floor(ms % (60 * 1000) / 1000);
  const str = `${hr.toFixed(0).padStart(2, '0')}:${min.toFixed(0).padStart(2, '0')}:${s.toFixed(0).padStart(2, '0')}`;
  return str;
}

/**
 * Removes all characters from a string that are greater than 2 bytes.
 * 
 * @param str - The string to process.
 * 
 * @returns The processed string with characters greater than 2 bytes removed.
 */
export function strToUtf8(str: string): string {
  // https://stackoverflow.com/questions/31698871/er-truncated-wrong-value-for-field-on-saving-some-strings-to-mysql
  return str.replace(/[\u0800-\uFFFF]/g, '');
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param str - The string to capitalize.
 * 
 * @returns The capitalized string.
 */
export function capitalizeStr(str: string): string {
  if (str.length < 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts an object to a key-value array, only 1 layer deep.
 * 
 * @param obj - The object to convert.
 * 
 * @returns An array of key-value pairs.
 */
export function objToKeyValueArr(obj: Record<string, any>): Array<[string, string]> {
  const newArr: Array<[string, string]> = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArr.push([key, JSON.stringify(obj[key])]);
    }
  }
  return newArr;
}

/**
 * Returns the value corresponding to the first true condition.
 * 
 * @param conditionsAndValues - A list of arrays, each containing a condition and a corresponding value.
 * 
 * @returns The value corresponding to the first true condition.
 */
export function getValueByCondition(...conditionsAndValues: [boolean, any][]): any {
  for (let [condition, value] of conditionsAndValues) {
    if (condition) {
      return value;
    }
  }
  return null;
}
