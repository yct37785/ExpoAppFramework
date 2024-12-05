// TestRunner.js
import ShellTestRunner from './ShellTestRunner';
// Import other test runners as needed.

class TestRunner {
  constructor() {
    this.testRunners = [
      new ShellTestRunner(),
      // Add other test runner instances here.
    ];
  }

  /**
   * Runs all registered tests and logs results synchronously.
   */
  runAllTests() {
    const allResults = [];
    console.log();
    console.log(`*** Running tests ***`);
    console.log();

    this.testRunners.forEach((runner) => {
      allResults.push({ className: runner.className, results: runner.runTests() });
    });
    
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
      results.forEach((test) => {
        console.log(
          `  ${test.test}: ${test.status ? 'Pass' : `Fail`}`
        );
      });
      console.log();
    });
    console.log('*** All tests completed ***');
    console.log();
  }
}

export default TestRunner;
