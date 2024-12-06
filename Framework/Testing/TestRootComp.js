import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Sample_TestRunner from './Sample_TestRunner';
import AsyncStorageAPI_TestRunner from './AsyncStorageAPI_TestRunner';
import LocalDataManager_TestRunner from './LocalDataManager_TestRunner';

/**
 * Minimalist RootComp to run tests with an actual React Native DOM.
 */
const TestRootComp = () => {
  const [currentRunner, setCurrentRunner] = useState(0); // Track the current test runner
  const testRunners = [
    Sample_TestRunner,
    AsyncStorageAPI_TestRunner,
    LocalDataManager_TestRunner,
  ]; // Array of test runner components

  useEffect(() => {
    console.log();
    console.log(`*** Running tests ***`);
  }, []);

  /**
   * Logs test results array from React child.
   *
   * @param {String} className - Name of the class being tested (not the TestRunner classname).
   * @param {Array<Object>} results - An array of results = { test: str, status: bool } from each test function.
   */
  const logClassTestResult = (className, results) => {
    console.log();
    console.log(`Class ${className}:`);
    results.forEach(({ test, status }) => {
      console.log(`  ${test}: ${status ? 'Pass' : 'Fail'}`);
    });
    console.log();

    // Move to the next test runner
    setCurrentRunner((prevRunner) => prevRunner + 1);
  };

  const CurrentTestRunner = testRunners[currentRunner];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TEST MODE</Text>
      {currentRunner < testRunners.length && (
        <CurrentTestRunner logClassTestResult={logClassTestResult} />
      )}
      {currentRunner >= testRunners.length && <Text>All tests completed!</Text>}
    </View>
  );
};

export default memo(TestRootComp);
