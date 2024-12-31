import React, { useEffect, memo } from 'react';
import { IOnTestEndProps, ITestRunnerProps } from '../Index/PropType';

/**
 * Run unit/integration tests for a single class with an actual React Native DOM.
 * 
 * @param props - Component props.
 * @param props.onTestEnd - Called at the end of the test.
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
    const results: IOnTestEndProps = [];

    results.push({ test: 'example 1', status: await exampleTest() });
    results.push({ test: 'example 2', status: await exampleTest2() });

    onTestEnd(className, results);
  }

  /**
   * Example test case.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async function exampleTest(): Promise<boolean> {
    let status = true;
    return status;
  }

  /**
   * Example test case 2.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async function exampleTest2(): Promise<boolean> {
    let status = false;
    return status;
  }

  return null;
}

export default memo(Sample_TestRunner);
