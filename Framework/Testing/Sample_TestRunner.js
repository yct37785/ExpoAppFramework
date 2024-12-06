import React, { Node, useCallback, memo, useEffect, useState } from 'react';

/**
 * Run unit/integration tests for a single class with an actual React Native DOM.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.logClassTestResult - Logs test results given a list of results.
 */
const Sample_TestRunner = ({logClassTestResult}) => {
  const className = "Sample";

  useEffect(() => {
    runTests();
  }, []);

  /**
   * Runs all tests for this module synchronously.
   */
  async function runTests() {
    const results = [];

    results.push({ test: 'example 1', status: await exampleTest() });
    results.push({ test: 'example 2', status: await exampleTest2() });

    logClassTestResult(className, results);
  }

  /**
   * Example test case.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async function exampleTest() {
    let status = true;

    return status;
  }

  /**
   * Example test case 2.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async function exampleTest2() {
    let status = false;

    return status;
  }

  return null;
}

export default memo(Sample_TestRunner);
