import React, { useEffect, useState, memo, useRef, useCallback, useContext } from 'react';
import { useLocalDataManager } from '../Hook/LocalDataHook';
import { delayPromise } from '../Utility/GeneralUtility';

/**
 * Test runner for LocalDataManager.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onTestEnd - Callback when tests finish.
 */
const LocalDataManager_TestRunner = ({ onTestEnd }) => {
  const className = 'LocalDataManager';

  // Test data schema
  const LOCAL_DATA_DEFAULT_KEY_VALUES = {
    key1: 'value1',
    key2: 123,
    key3: { nested: true },
  };

  const {
    isLocalDataReady,
    updateFlag,
    writeLocalData,
    readLocalData,
    readAllLocalData,
    deleteLocalData,
    deleteAllLocalData,
    retrieveDanglingKeys
  } = useLocalDataManager(LOCAL_DATA_DEFAULT_KEY_VALUES);
  
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
   * Runs all tests in sequence.
   */
  async function runTests() {
    const results = [];

    results.push({ test: 'Initialize Local Data', status: await testInitialization() });
    results.push({ test: 'Write and Read Data', status: await testWriteReadData() });
    results.push({ test: 'Read All Local Data', status: await testReadAllData() });
    results.push({ test: 'Delete Data', status: await testDeleteData() });
    results.push({ test: 'Delete All Data', status: await testDeleteAllData() });
    results.push({ test: 'Retrieve Dangling Keys', status: await testDanglingKeys() });
    results.push({ test: 'Update Trigger', status: await testUpdateFlag() });

    // cleanup
    await deleteAllLocalData();

    onTestEnd(className, results);
  }

  // Test Cases

  async function testInitialization() {
    try {
      const allData = await readAllLocalData();
      return (
        allData.key1 === 'value1' &&
        allData.key2 === 123 &&
        JSON.stringify(allData.key3) === JSON.stringify({ nested: true })
      );
    } catch {
      return false;
    }
  }

  async function testWriteReadData() {
    try {
      await writeLocalData('key1', 'newValue');
      const value = await readLocalData('key1');
      return value === 'newValue';
    } catch {
      return false;
    }
  }

  async function testReadAllData() {
    try {
      const allData = await readAllLocalData();
      return (
        allData.key1 === 'newValue' &&
        allData.key2 === 123 &&
        JSON.stringify(allData.key3) === JSON.stringify({ nested: true })
      );
    } catch {
      return false;
    }
  }

  async function testDeleteData() {
    try {
      await deleteLocalData('key1');
      const value = await readLocalData('key1');
      return value === null;
    } catch {
      return false;
    }
  }

  async function testDeleteAllData() {
    try {
      await deleteAllLocalData();
      const allData = await readAllLocalData();
      return Object.keys(allData).length === 0;
    } catch {
      return false;
    }
  }

  async function testDanglingKeys() {
    try {
      await writeLocalData('unusedKey', 'dangling', true);
      const danglingKeys = await retrieveDanglingKeys();
      return (
        danglingKeys.unusedKey === 'dangling' &&
        !LOCAL_DATA_DEFAULT_KEY_VALUES.hasOwnProperty('unusedKey')
      );
    } catch {
      return false;
    }
  }

  async function testUpdateFlag() {
    try {
      const updateFlag_1 = updateFlagRef.current;
      await writeLocalData('key2', 456);
      await delayPromise(100);
      const updateFlag_2 = updateFlagRef.current;
      return updateFlag_1 + 1 === updateFlag_2;
    } catch {
      return false;
    }
  }

  return null;
};

export default memo(LocalDataManager_TestRunner);
