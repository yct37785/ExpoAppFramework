import React, { useEffect, useState, memo, useRef, useCallback, useContext } from 'react';
import { LocalDataProvider, useLocalDataContext } from '../Hook/LocalDataHook';
import { delayPromise } from '../Utility/GeneralUtility';

const LOCALDATA_TEST_SCHEMA = {
  key1: 'value1',
  key2: 123,
  key3: { nested: true },
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
    deleteAllLocalData
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
   * Runs all tests in sequence.
   */
  async function runTests() {
    const results = [];

    results.push({ test: 'Load local data', status: await testInitialization() });
    results.push({ test: 'Write and read data', status: await testWriteReadData() });

    // cleanup
    await deleteAllLocalData();

    onTestEnd(className, results);
  }

  async function testInitialization() {
    try {
      let missingKey = false;
      for (let key in LOCALDATA_TEST_SCHEMA) {
        const v = readLocalData(key);
        if (v === null) {
          missingKey = true;
          break;
        }
      }
      return !missingKey;
    } catch {
      return false;
    }
  }

  async function testWriteReadData() {
    try {
      const newValue = "abcd123";
      await writeLocalData('key1', newValue);
      const value = readLocalData('key1');
      return value === newValue;
    } catch {
      return false;
    }
  }

  return null;
};

const LocalDataProviderWrapper = ({ onTestEnd }) => {
  return (
    <LocalDataProvider schema={LOCALDATA_TEST_SCHEMA}>
      <LocalDataManager_TestRunner onTestEnd={onTestEnd} />
    </LocalDataProvider>
  );
}

export default memo(LocalDataProviderWrapper);
