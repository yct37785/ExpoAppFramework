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
    console.log('Running all tests...');
    const allResults = [];

    this.testRunners.forEach((runner) => {
      console.log(`Running tests for ${runner.name}...`);
      try {
        const results = runner.runTests();
        allResults.push({ name: runner.name, results });
      } catch (error) {
        console.error(`Error running tests for ${runner.name}:`, error);
        allResults.push({ name: runner.name, error: error.message });
      }
    });
    
    this.logResults(allResults);
  }

  /**
   * Logs test results to the console.
   * @param {Array} allResults - Array of test results.
   */
  logResults(allResults) {
    console.log('\nTest Results:');
    allResults.forEach(({ name, results, error }) => {
      console.log(`\n${name}:`);
      if (error) {
        console.error(`  Error: ${error}`);
      } else {
        results.forEach((test) => {
          console.log(
            `  ${test.test}: ${test.success ? 'Pass' : `Fail (${test.error})`}`
          );
        });
      }
    });
    console.log('All tests completed.');
  }
}

export default TestRunner;
