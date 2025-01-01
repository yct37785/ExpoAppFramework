import React, { useEffect, memo } from 'react';
import { OnTestEndResultsList, ITestRunnerProps } from '../Index/PropType';

/**
 * Run unit/integration tests for a single class with an actual React Native DOM.
 */
const Sample_TestRunner: React.FC<ITestRunnerProps> = ({ onTestEnd }) => {
  const className = "Sample";

  useEffect(() => {
    runTests();
  }, []);

  /**
   * Runs all tests for this module synchronously.
   */
  async function runTests(): Promise<void> {
    const results: OnTestEndResultsList = [];

    results.push({ test: 'example 1', status: await exampleTest() });
    results.push({ test: 'example 2', status: await exampleTest2() });

    onTestEnd(className, results);
  }

  /**
   * Example test case.
   * 
   * @returns Test result status.
   */
  async function exampleTest(): Promise<boolean> {
    let status = true;
    return status;
  }

  /**
   * Example test case 2.
   * 
   * @returns Test result status.
   */
  async function exampleTest2(): Promise<boolean> {
    let status = false;
    return status;
  }

  return null;
}

export default memo(Sample_TestRunner);
