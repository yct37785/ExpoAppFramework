import {
  writeDataAS,
  readDataAS,
  deleteDataAS,
  getAllKeysAS,
  deleteAllDataAS,
} from '../API/AsyncStorageAPI';

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
      key2a: 'world',
    },
  };

  UPDATED_SCHEMA = {
    key1: {
      key1a: 'updated_hello',
      key1b: {
        key1ba: 'updated_hello',
      },
    },
    key2: {
      key2a: 'updated_world',
    },
  };

  /**
   * Runs all tests for this module synchronously.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of test results.
   */
  async runTests() {
    const results = [];

    // delete all data before test
    await deleteAllDataAS();

    results.push({
      test: 'createDataTest',
      status: await this.createDataTest(),
    });

    results.push({
      test: 'readDataTest',
      status: await this.readDataTest(),
    });

    results.push({
      test: 'updateDataTest',
      status: await this.updateDataTest(),
    });

    results.push({
      test: 'deleteDataTest',
      status: await this.deleteDataTest(Object.keys(this.UPDATED_SCHEMA)),
    });

    results.push({
      test: 'readAllKeysTest',
      status: await this.readAllKeysTest([]),
    });
    
    // delete all data after test
    await deleteAllDataAS();

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

  /**
   * Read and verify data matches TEST_SCHEMA.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async readDataTest() {
    let status = true;
    try {
      const keys = Object.keys(this.TEST_SCHEMA);
      const data = await readDataAS(keys);

      for (const key of keys) {
        const expectedValue = JSON.stringify(this.TEST_SCHEMA[key]);
        const retrievedValue = JSON.stringify(data[key]);
        if (retrievedValue !== expectedValue) {
          console.error(
            `Mismatch for key ${key}: expected ${expectedValue}, got ${retrievedValue}`
          );
          status = false;
        }
      }
    } catch (e) {
      console.error(`Error in readDataTest: ${e.message}`);
      status = false;
    }
    return status;
  }

  /**
   * Update data and verify it matches UPDATED_SCHEMA.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async updateDataTest() {
    let status = true;
    const keyValueList = Object.entries(this.UPDATED_SCHEMA).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);

    try {
      await writeDataAS(keyValueList);
      const keys = Object.keys(this.UPDATED_SCHEMA);
      const data = await readDataAS(keys);

      for (const key of keys) {
        const expectedValue = JSON.stringify(this.UPDATED_SCHEMA[key]);
        const retrievedValue = JSON.stringify(data[key]);
        if (retrievedValue !== expectedValue) {
          console.error(
            `Mismatch for key ${key}: expected ${expectedValue}, got ${retrievedValue}`
          );
          status = false;
        }
      }
    } catch (e) {
      console.error(`Error in updateDataTest: ${e.message}`);
      status = false;
    }
    return status;
  }

  /**
   * Delete data and verify it is no longer retrievable.
   * 
   * @param {Array<string>} deleteKeyList - An array of keys to be deleted.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async deleteDataTest(deleteKeyList) {
    let status = true;

    try {
      await deleteDataAS(deleteKeyList);
      const data = await readDataAS(deleteKeyList);

      for (const key of deleteKeyList) {
        if (data[key] !== null && data[key] !== undefined) {
          console.error(`Key ${key} still exists after deletion.`);
          status = false;
        }
      }
    } catch (e) {
      console.error(`Error in deleteDataTest: ${e.message}`);
      status = false;
    }
    return status;
  }

  /**
   * Read all keys from AsyncStorage and verify they match expected keys.
   * 
   * @param {Array<string>} compareKeyList - An array of keys to be compared.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async readAllKeysTest(compareKeyList) {
    let status = true;

    try {
      const keys = await getAllKeysAS();
      status = JSON.stringify(keys.sort()) === JSON.stringify(compareKeyList.sort());
    } catch (e) {
      console.error(`Error in readAllKeysTest: ${e.message}`);
      status = false;
    }
    return status;
  }
}

export default AsyncStorageAPI_TestRunner;
