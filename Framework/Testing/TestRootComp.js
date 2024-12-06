// core
import React, { Node, useCallback, memo, useEffect, useState } from 'react';
import { View } from 'react-native';
// UI
import { Provider as PaperProvider, Text } from 'react-native-paper';
// test runners
 import Sample_TestRunner from './Sample_TestRunner';
 import AsyncStorageAPI_TestRunner from './AsyncStorageAPI_TestRunner';
 import LocalDataManager_TestRunner from './LocalDataManager_TestRunner';

/**
 * Minimalist RootComp to run tests with an actual React Native DOM.
 */
const TestRootComp = () => {

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
  function logClassTestResult(className, results) {
    console.log();
    console.log(`Class ${className}:`);
      results.forEach(({ test, status }) => {
        console.log(`  ${test}: ${status ? 'Pass' : 'Fail'}`);
      });
      console.log();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TEST MODE</Text>
      <Sample_TestRunner logClassTestResult={logClassTestResult} />
      <AsyncStorageAPI_TestRunner logClassTestResult={logClassTestResult} />
      <LocalDataManager_TestRunner logClassTestResult={logClassTestResult} />
    </View>
  );
};

export default memo(TestRootComp);