class ShellTestRunner {
  constructor() {
    this.className = 'ShellClass';
  }

  /**
   * Runs all tests for this module synchronously.
   * @returns {Array} An array of test results.
   */
  runTests() {
    const results = [];

    results.push({ test: 'exampleTest', status: this.exampleTest() });
    results.push({ test: 'exampleTest2', status: this.exampleTest2() });

    return results;
  }

  /**
   * Example test case.
   * 
   * @returns {Boolean} Test result status.
   */
  exampleTest() {
    let status = true;

    return status;
  }

    /**
   * Example test case.
   * 
   * @returns {Boolean} Test result status.
   */
    exampleTest2() {
      let status = false;
  
      return status;
    }
}

export default ShellTestRunner;
