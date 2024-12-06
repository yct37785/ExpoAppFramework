import useLocalDataManager from '../Hooks/LocalDataManager';
import { act, renderHook } from '@testing-library/react-hooks';

/**
 * Test Runner for LocalDataManager hook
 */
class LocalDataManager_TestRunner {
  constructor() {
    this.className = 'LocalDataManager';
  }

  LOCAL_DATA_SCHEMA = {
    settings_sample: {
      isDarkMode: false,
      language: 'en',
    },
    user_profile: {
      name: 'Guest',
      age: null,
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
    results.push({
      test: 'readDataTest',
      status: await this.readDataTest(),
    });
    results.push({
      test: 'updateDataTest',
      status: await this.updateDataTest(),
    });
    results.push({
      test: 'resetDataTest',
      status: await this.resetDataTest(),
    });

    return results;
  }

  /**
   * Tests creating local data from schema.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async createDataTest() {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalDataManager({ LOCAL_DATA_SCHEMA: this.LOCAL_DATA_SCHEMA })
    );

    // Wait for data to be loaded
    await waitForNextUpdate();

    const isLoaded = result.current.isLocalDataLoaded;
    return isLoaded && JSON.stringify(result.current.getLocalDataStringify()) === JSON.stringify(this.LOCAL_DATA_SCHEMA);
  }

  /**
   * Tests reading local data.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async readDataTest() {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalDataManager({ LOCAL_DATA_SCHEMA: this.LOCAL_DATA_SCHEMA })
    );

    // Wait for data to be loaded
    await waitForNextUpdate();

    const isDarkMode = result.current.getLocalDataValue('settings_sample.isDarkMode');
    const language = result.current.getLocalDataValue('settings_sample.language');
    return isDarkMode === false && language === 'en';
  }

  /**
   * Tests updating local data values.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async updateDataTest() {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalDataManager({ LOCAL_DATA_SCHEMA: this.LOCAL_DATA_SCHEMA })
    );

    // Wait for data to be loaded
    await waitForNextUpdate();

    // Update data
    await act(async () => {
      await result.current.setLocalDataValue([['settings_sample.isDarkMode', true]]);
      await result.current.setLocalDataValue([['user_profile.name', 'TestUser']]);
    });

    const isDarkMode = result.current.getLocalDataValue('settings_sample.isDarkMode');
    const userName = result.current.getLocalDataValue('user_profile.name');
    return isDarkMode === true && userName === 'TestUser';
  }

  /**
   * Tests resetting local data to schema defaults.
   * 
   * @returns {Promise<boolean>} A promise that resolves to the test result status.
   */
  async resetDataTest() {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLocalDataManager({ LOCAL_DATA_SCHEMA: this.LOCAL_DATA_SCHEMA })
    );

    // Wait for data to be loaded
    await waitForNextUpdate();

    // Update data
    await act(async () => {
      await result.current.setLocalDataValue([['settings_sample.isDarkMode', true]]);
    });

    // Reset data
    await act(async () => {
      await result.current.resetLocalData();
    });

    const isDarkMode = result.current.getLocalDataValue('settings_sample.isDarkMode');
    const language = result.current.getLocalDataValue('settings_sample.language');
    return isDarkMode === false && language === 'en';
  }
}

export default LocalDataManager_TestRunner;
