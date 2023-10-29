import AsyncStorage from '@react-native-async-storage/async-storage';

/**------------------------------------------------------------------------------------*
 * Delete
 *------------------------------------------------------------------------------------*/
/**
 * Delete an object
 */
export async function deleteDataAS(keys) {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    throw new Error(e);
  }
}

/**------------------------------------------------------------------------------------*
 * Read
 *------------------------------------------------------------------------------------*/
/**
 * Read all data from async storage
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
 * Read all keys from async storage
 */
export async function getAllKeysAS() {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw new Error(e);
  }
}

/**------------------------------------------------------------------------------------*
 * Write
 *------------------------------------------------------------------------------------*/
/**
 * Write data
 * param keyValueList: [ [ key: str, value: str ] ]
 */
export async function WriteDataAS(keyValueList) {
  try {
    if (keyValueList.length > 0) {
      await AsyncStorage.multiSet(keyValueList);
    }
  } catch (e) {
    throw new Error(e);
  }
}

/**------------------------------------------------------------------------------------*
 * Utils
 *------------------------------------------------------------------------------------*/
/**
 * Helper for converting object to key value list, only 1 layer deep
 * param object: {}
 */
export function objToKeyValueArr(obj) {
  const newArr = [];
  for (key in obj) {
    newArr.push([key, JSON.stringify(obj[key])]);
  }
  return newArr;
}