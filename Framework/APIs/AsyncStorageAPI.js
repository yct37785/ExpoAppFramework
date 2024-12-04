import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Deletes an object from AsyncStorage.
 * 
 * @param {Array<string>} keys - The keys of the objects to delete.
 * 
 * @returns {Promise<void>} A promise that resolves when the objects are deleted.
 * @throws {Error} If an error occurs during deletion.
 */
export async function deleteDataAS(keys) {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Reads data from AsyncStorage.
 * 
 * @param {Array<string>} keyList - The keys of the data to read.
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing the key-value pairs.
 * @throws {Error} If an error occurs during reading.
 */
export async function readDataAS(keyList) {
  try {
    let jsonValue = await AsyncStorage.multiGet(keyList);
    const retVal = {};
    jsonValue.map((keyValPair) => {
      retVal[keyValPair[0]] = JSON.parse(keyValPair[1]);
    });
    return retVal;
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Reads all keys from AsyncStorage.
 * 
 * @returns {Promise<Array<string>>} A promise that resolves to an array of all keys.
 * @throws {Error} If an error occurs during reading.
 */
export async function getAllKeysAS() {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Writes data to AsyncStorage.
 * 
 * @param {Array<Array<string>>} keyValueList - An array of key-value pairs to write.
 * 
 * @returns {Promise<void>} A promise that resolves when the data is written.
 * @throws {Error} If an error occurs during writing.
 */
export async function writeDataAS(keyValueList) {
  try {
    if (keyValueList.length > 0) {
      await AsyncStorage.multiSet(keyValueList);
    }
  } catch (e) {
    throw new Error(e);
  }
}