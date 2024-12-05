import { writeDataAS } from '../API/AsyncStorageAPI';

/**
 * Test AsyncStorage API
 */
class AsyncStorageAPI_TestRunner {
  constructor() {
    this.className = 'AsyncStorageAPI';
  }

  TEST_SCHEMA = {
    key1: {
      key1a: 'hello',
      key1b: {
        key1ba: 'hello',
      },
    },
    key2: {
      key2a: 'hello',
    },
  };

  /**
   * Runs all tests for this module synchronously.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of test results.
   */
  async runTests() {
    const results = [];

    results.push({
      test: 'createDataTest',
      status: await this.createDataTest(),
    });

    return results;
  }

  /**
   * Create new local data from TEST_SCHEMA.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async createDataTest() {
    let status = true;
    const keyValueList = Object.entries(this.TEST_SCHEMA).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);

    try {
      await writeDataAS(keyValueList);
    } catch (e) {
      console.error(`Error in createDataTest: ${e.message}`);
      status = false;
    }

    return status;
  }
}

export default AsyncStorageAPI_TestRunner;
