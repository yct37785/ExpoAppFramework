import React, { useEffect, useRef, memo } from 'react';
import { LocalDataProvider, useLocalDataContext } from '../DataManagement/LocalDataManager';
import { OnTestEndParams, ITestRunnerProps } from '../Index/PropType';

const LOCALDATA_TEST_SCHEMA = {
  stringKey: 'defaultString',
  numberKey: 42,
  booleanKey: true,
  objectKey: { nested: { deep: "value" } },
  arrayKey: [1, 2, 3],
  nullKey: null,
  undefinedKey: undefined,  // this should be handled as a missing key
};

/**
 * Test runner for LocalDataManager.
 * 
 * @param props - Component props.
 * @param props.onTestEnd - Called at the end of the test.
 */
const LocalDataManager_TestRunner: React.FC<ITestRunnerProps> = ({ onTestEnd }) => {
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
   * Runs all tests for this module synchronously.
   */
  async function runTests(): Promise<void> {
    const results: OnTestEndParams = [];

    results.push(await runTest("Initialization Test", testInitialization));
    results.push(await runTest("Valid Data Write/Read Test", testValidDataWriteRead));
    results.push(await runTest("Dangling Key Handling Test", testDanglingKeyHandling));
    results.push(await runTest("Invalid Key Handling Test", testInvalidKeyHandling));
    results.push(await runTest("Missing Key Handling Test", testMissingKeyHandling));
    results.push(await runTest("Deep Object Integrity Test", testDeepObjectIntegrity));
    results.push(await runTest("Array Integrity Test", testArrayIntegrity));
    results.push(await runTest("Null Value Handling Test", testNullValueHandling));
    results.push(await runTest("Null Key Handling Test", testNullKeyHandling));

    // cleanup
    await clearLocalData();

    onTestEnd(className, results);
  }

  /* ----------- TEST CASES ----------- */

  async function testInitialization(): Promise<boolean> {
    for (const [key, value] of Object.entries(LOCALDATA_TEST_SCHEMA)) {
      if (value === null || value === undefined) continue;
      const readvalue = readLocalData(key);
      if (JSON.stringify(value) !== JSON.stringify(readvalue)) return false;
    }
    return true;
  };

  async function testValidDataWriteRead(): Promise<boolean> {
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

  async function testDanglingKeyHandling(): Promise<boolean> {
    const danglingKey = "danglingKey";
    const danglingValue = "temporaryValue";

    await writeLocalData(danglingKey, danglingValue, true);
    const danglingKeys = await readDanglingKeys();
    if (danglingKeys[danglingKey] !== danglingValue) return false;

    await clearDanglingKeys();
    const new_danglingKeys = await readDanglingKeys();
    return Object.keys(new_danglingKeys).length === 0;
  };

  async function testInvalidKeyHandling(): Promise<boolean> {
    try {
      await writeLocalData("invalidKey", "someValue");
    } catch {
      return true;
    }
    return false;
  };

  async function testMissingKeyHandling(): Promise<boolean> {
    try {
      readLocalData("nonExistentKey");
      return false;
    } catch {
      return true;
    }
  };

  async function testDeepObjectIntegrity(): Promise<boolean> {
    const deepObjectKey = "objectKey";
    const updatedObject = { nested: { deep: "newValue", extra: 456 } };

    await writeLocalData(deepObjectKey, updatedObject);
    const storedValue = readLocalData(deepObjectKey);
    return JSON.stringify(storedValue) === JSON.stringify(updatedObject);
  };

  async function testArrayIntegrity(): Promise<boolean> {
    const arrayKey = "arrayKey";
    const updatedArray = [9, 8, 7, 6];

    await writeLocalData(arrayKey, updatedArray);
    const storedValue = readLocalData(arrayKey);
    return JSON.stringify(storedValue) === JSON.stringify(updatedArray);
  };

  async function testNullValueHandling(): Promise<boolean> {
    try {
      await writeLocalData("numberKey", null);
    } catch {
      return true;
    }
    return false;
  };

  async function testNullKeyHandling(): Promise<boolean> {
    try {
      await writeLocalData("", "null");
    } catch {
      try {
        readLocalData("");
      } catch {
        return true;
      }
    }
    return false;
  };

  return null;
};

/* ----------- PROVIDER WRAPPER ----------- */

const LocalDataProviderWrapper: React.FC<{ onTestEnd: ITestRunnerProps['onTestEnd'] }> = ({ onTestEnd }) => (
  <LocalDataProvider schema={LOCALDATA_TEST_SCHEMA}>
    <LocalDataManager_TestRunner onTestEnd={onTestEnd} />
  </LocalDataProvider>
);

export default memo(LocalDataProviderWrapper);
