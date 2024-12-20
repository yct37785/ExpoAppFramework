import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import LocalDataManager_TestRunner from './LocalDataManager_TestRunner';
import FirestoreManager_TestRunner from './FirestoreManager_TestRunner';

/**
 * Minimalist RootComp to run tests with an actual React Native DOM.
 */
const TestRootComp = () => {
  const [currentRunner, setCurrentRunner] = useState(0); // Track the current test runner
  const testRunners = [
    LocalDataManager_TestRunner,
    FirestoreManager_TestRunner
  ]; // Array of test runner components

  useEffect(() => {
    console.log();
    console.log(`*** Running tests ***`);
  }, []);

  /**
   * Logs test results array from React child after end of the tests. Must be called last in test runner function.
   *
   * @param {String} className - Name of the class being tested (not the TestRunner classname).
   * @param {Array<Object>} results - An array of results = { test: str, status: bool } from each test function.
   */
  const onTestEnd = (className, results) => {
    console.log();
    console.log(`Class ${className}:`);
    results.forEach(({ test, status }) => {
      console.log(`  ${test}: ${status ? 'PASS' : 'FAIL'}`);
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
        <CurrentTestRunner onTestEnd={onTestEnd} />
      )}
      {currentRunner >= testRunners.length && <Text>All tests completed!</Text>}
    </View>
  );
};

export default memo(TestRootComp);
