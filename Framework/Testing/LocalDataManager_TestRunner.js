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
    deleteAllLocalData
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

    // cleanup
    await deleteAllLocalData();

    onTestEnd(className, results);
  }

  // Test Cases

  async function testInitialization() {
    try {
      const key1_v = await readLocalData('key1');
      const key2_v = await readLocalData('key2');
      const key3_v = await readLocalData('key3');
      return (
        key1_v === 'value1' &&
        key2_v === 123 &&
        JSON.stringify(key3_v) === JSON.stringify({ nested: true })
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

  return null;
};

export default memo(LocalDataManager_TestRunner);
