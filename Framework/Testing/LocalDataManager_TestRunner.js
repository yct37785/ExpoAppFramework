import React, { useEffect, useRef, memo } from 'react';
import { LocalDataProvider, useLocalDataContext } from '../DataManagement/LocalDataManager';

const LOCALDATA_TEST_SCHEMA = {
  stringKey: 'defaultString',
  numberKey: 42,
  booleanKey: true,
  objectKey: { nested: { deep: "value" } },
  arrayKey: [1, 2, 3],
  nullKey: null,
  undefinedKey: undefined,  // This should be handled as a missing key.
};

/**
 * Test runner for LocalDataManager.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onTestEnd - Callback when tests finish.
 */
const LocalDataManager_TestRunner = ({ onTestEnd }) => {
  const className = 'LocalDataManager';

  const {
    isLocalDataReady,
    updateFlag,
    writeLocalData,
    readLocalData,
    readDanglingKeys,
    clearDanglingKeys,
    clearLocalData
  } = useLocalDataContext();

  const updateFlagRef = useRef(updateFlag);

  useEffect(() => {
    if (isLocalDataReady) {
      runTests();
    }
  }, [isLocalDataReady]);

  useEffect(() => {
    updateFlagRef.current = updateFlag;
  }, [updateFlag]);

  /**
   * Utility function for running individual tests.
   */
  const runTest = async (description, testFunc) => {
    try {
      const status = await testFunc();
      return { test: description, status };
    } catch (error) {
      console.error(`${description} failed with error: ${error.message}`);
      return { test: description, status: false };
    }
  };

  /**
   * Main test runner function
   */
  async function runTests() {
    const results = [];

    results.push(await runTest("Initialization Test", testInitialization));
    results.push(await runTest("Valid Data Write/Read Test", testValidDataWriteRead));
    results.push(await runTest("Dangling Key Handling Test", testDanglingKeyHandling));
    results.push(await runTest("Invalid Key Handling Test", testInvalidKeyHandling));
    results.push(await runTest("Missing Key Handling Test", testMissingKeyHandling));
    results.push(await runTest("Deep Object Integrity Test", testDeepObjectIntegrity));
    results.push(await runTest("Array Integrity Test", testArrayIntegrity));
    results.push(await runTest("Null Value Handling Test", testNullValueHandling));
    results.push(await runTest("Null Key Handling Test", testNullKeyHandling));

    // Cleanup
    await clearLocalData();

    onTestEnd(className, results);
  }

  /* ----------- TEST CASES ----------- */

  const testInitialization = async () => {
    for (const [key, value] of Object.entries(LOCALDATA_TEST_SCHEMA)) {
      if (value === null || value === undefined) continue;
      const readvalue = readLocalData(key);
      if (JSON.stringify(value) !== JSON.stringify(readvalue)) return false;
    }
    return true;
  };

  const testValidDataWriteRead = async () => {
    const testData = {
      stringKey: "updatedString",
      numberKey: 12345,
      booleanKey: false,
    };

    for (let [key, value] of Object.entries(testData)) {
      await writeLocalData(key, value);
      const storedValue = readLocalData(key);
      if (storedValue !== value) return false;
    }
    return true;
  };

  const testDanglingKeyHandling = async () => {
    const danglingKey = "danglingKey";
    const danglingValue = "temporaryValue";

    await writeLocalData(danglingKey, danglingValue, true);
    const danglingKeys = await readDanglingKeys();
    if (danglingKeys[danglingKey] !== danglingValue) return false;

    await clearDanglingKeys();
    const new_danglingKeys = await readDanglingKeys();
    return Object.keys(new_danglingKeys).length === 0;
  };

  const testInvalidKeyHandling = async () => {
    try {
      await writeLocalData("invalidKey", "someValue");
    } catch {
      return true;
    }
    return false;
  };

  const testMissingKeyHandling = async () => {
    try {
      readLocalData("nonExistentKey");
      return false;
    } catch {
      return true;
    }
  };

  const testDeepObjectIntegrity = async () => {
    const deepObjectKey = "objectKey";
    const updatedObject = { nested: { deep: "newValue", extra: 456 } };

    await writeLocalData(deepObjectKey, updatedObject);
    const storedValue = readLocalData(deepObjectKey);
    return JSON.stringify(storedValue) === JSON.stringify(updatedObject);
  };

  const testArrayIntegrity = async () => {
    const arrayKey = "arrayKey";
    const updatedArray = [9, 8, 7, 6];

    await writeLocalData(arrayKey, updatedArray);
    const storedValue = readLocalData(arrayKey);
    return JSON.stringify(storedValue) === JSON.stringify(updatedArray);
  };

  const testNullValueHandling = async () => {
    try {
      await writeLocalData(numberKey, null);
    } catch {
      return true;
    }
    return false;
  };

  const testNullKeyHandling = async () => {
    try {
      await writeLocalData(null, "null");
    } catch {
      try {
        readLocalData(null);
      } catch {
        return true;
      }
    }
    return false;
  };

  return null;
};

/* ----------- PROVIDER WRAPPER ----------- */

const LocalDataProviderWrapper = ({ onTestEnd }) => (
  <LocalDataProvider schema={LOCALDATA_TEST_SCHEMA}>
    <LocalDataManager_TestRunner onTestEnd={onTestEnd} />
  </LocalDataProvider>
);

export default memo(LocalDataProviderWrapper);
