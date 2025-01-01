import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import LocalDataManager_TestRunner from './LocalDataManager_TestRunner';
import FirestoreManager_TestRunner from './FirestoreManager_TestRunner';
import { OnTestEndResultsList, ITestRunnerProps } from '../Index/PropType';

/**
 * Minimalist RootComp to run tests with an actual React Native DOM.
 */
const TestRootComp: React.FC = () => {
  const [currentRunner, setCurrentRunner] = useState<number>(0); // track the current test runner

  // define the array of test runner components
  const testRunners: React.ComponentType<ITestRunnerProps>[] = [
    LocalDataManager_TestRunner,
    FirestoreManager_TestRunner
  ];

  useEffect(() => {
    console.log();
    console.log(`*** Running tests ***`);
  }, []);

  /**
   * Logs test results array from React child after the end of the tests. 
   * Must be called last in the test runner function.
   */
  const onTestEnd = (className: string, results: OnTestEndResultsList) => {
    console.log();
    console.log(`Class ${className}:`);
    results.forEach(({ test, status }) => {
      console.log(`  ${test}: ${status ? 'PASS' : 'FAIL'}`);
    });
    console.log();

    // move to the next test runner
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
