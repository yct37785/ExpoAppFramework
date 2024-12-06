import AsyncStorageAPI_TestRunner from './AsyncStorageAPI_TestRunner';
import LocalDataManager_TestRunner from './LocalDataManager_TestRunner';

/**
 * Main Test Runner class for running all test suites synchronously.
 */
class TestRunner {
  constructor() {
    this.testRunners = [
      new AsyncStorageAPI_TestRunner(),
      new LocalDataManager_TestRunner(),
      // Add other test runner instances here.
    ];
  }

  /**
   * Runs all registered tests and logs results synchronously.
   * 
   * @returns {Promise<void>} A promise that resolves when all tests are complete.
   */
  async runAllTests() {
    const allResults = [];

    console.log();
    console.log(`*** Running tests ***`);
    console.log();

    for (const runner of this.testRunners) {
      try {
        const results = await runner.runTests();
        allResults.push({ className: runner.className, results });
      } catch (e) {
        console.error(`Error in ${runner.className}: ${e.message}`);
        allResults.push({ className: runner.className, results: [] });
      }
    }

    this.logResults(allResults);
  }

  /**
   * Logs test results to the console.
   * 
   * @param {Array} allResults - Array of test results.
   */
  logResults(allResults) {
    allResults.forEach(({ className, results }) => {
      console.log(`Class ${className}:`);
      results.forEach(({ test, status }) => {
        console.log(`  ${test}: ${status ? 'Pass' : 'Fail'}`);
      });
      console.log();
    });

    console.log('*** All tests completed ***');
    console.log();
  }
}

export default TestRunner;
