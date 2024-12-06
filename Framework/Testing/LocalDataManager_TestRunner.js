import React, { memo, useEffect } from 'react';
import useLocalDataManager from '../Manager/LocalDataManager';

/**
 * LocalDataManager Test Runner
 *
 * @param {Object} props - Component props.
 * @param {Function} props.logClassTestResult - Logs test results given a list of results.
 */
const LocalDataManager_TestRunner = ({ logClassTestResult }) => {
  const className = 'LocalDataManager';

  const LOCAL_DATA_SCHEMA = {
    userSettings: {
      theme: 'light',
      notifications: true,
    },
    gameData: {
      level: 1,
      score: 0,
      achievements: [],
    },
  };

  const UPDATED_DATA = {
    userSettings: {
      theme: 'dark',
      notifications: false,
    },
    gameData: {
      level: 5,
      score: 1000,
      achievements: ['first_win'],
    },
  };

  const ADDITIONAL_DATA = {
    userSettings: {
      language: 'en',
    },
  };

  useEffect(() => {
    runTests();
  }, []);

  /**
   * Runs all tests for this module synchronously.
   */
  async function runTests() {
    const results = [];
    const {
      setLocalDataValue,
      getLocalDataValue,
      resetLocalData,
      getLocalDataStringify,
    } = useLocalDataManager({ LOCAL_DATA_SCHEMA });

    try {
      results.push("initialization", await testInitialization(getLocalDataValue));
      results.push("set and retrieve", await testSetAndRetrieve(setLocalDataValue, getLocalDataValue));
      results.push("update data", await testUpdateData(setLocalDataValue, getLocalDataValue));
      results.push("reset", await testReset(resetLocalData, getLocalDataStringify));
    } catch (error) {
      console.error(`Error during test execution: ${error.message}`);
    }

    logClassTestResult(className, results);
  }

  /**
   * Tests initialization and loading of default schema.
   */
  async function testInitialization(getLocalDataValue) {
    const testName = 'Initialization Test';
    try {
      const theme = getLocalDataValue('userSettings.theme');
      const level = getLocalDataValue('gameData.level');

      if (theme !== LOCAL_DATA_SCHEMA.userSettings.theme || level !== LOCAL_DATA_SCHEMA.gameData.level) {
        throw new Error(
          `Schema mismatch: theme "${theme}" (expected: "${LOCAL_DATA_SCHEMA.userSettings.theme}"), level "${level}" (expected: "${LOCAL_DATA_SCHEMA.gameData.level}")`
        );
      }
      return { test: testName, status: true };
    } catch (e) {
      return { test: testName, status: false, error: e.message };
    }
  }

  /**
   * Tests setting and retrieving data.
   */
  async function testSetAndRetrieve(setLocalDataValue, getLocalDataValue) {
    const testName = 'Set and Retrieve Test';
    try {
      await setLocalDataValue([
        ['userSettings.theme', UPDATED_DATA.userSettings.theme],
        ['gameData.score', UPDATED_DATA.gameData.score],
      ]);

      const theme = getLocalDataValue('userSettings.theme');
      const score = getLocalDataValue('gameData.score');

      if (theme !== UPDATED_DATA.userSettings.theme || score !== UPDATED_DATA.gameData.score) {
        throw new Error(
          `Data mismatch: theme "${theme}" (expected: "${UPDATED_DATA.userSettings.theme}"), score "${score}" (expected: "${UPDATED_DATA.gameData.score}")`
        );
      }
      return { test: testName, status: true };
    } catch (e) {
      return { test: testName, status: false, error: e.message };
    }
  }

  /**
   * Tests updating nested data.
   */
  async function testUpdateData(setLocalDataValue, getLocalDataValue) {
    const testName = 'Update Data Test';
    try {
      await setLocalDataValue([
        ['gameData.achievements', UPDATED_DATA.gameData.achievements],
        ['userSettings.language', ADDITIONAL_DATA.userSettings.language],
      ]);

      const achievements = getLocalDataValue('gameData.achievements');
      const language = getLocalDataValue('userSettings.language');

      if (
        JSON.stringify(achievements) !== JSON.stringify(UPDATED_DATA.gameData.achievements) ||
        language !== ADDITIONAL_DATA.userSettings.language
      ) {
        throw new Error(
          `Data mismatch: achievements "${JSON.stringify(
            achievements
          )}" (expected: "${JSON.stringify(UPDATED_DATA.gameData.achievements)}"), language "${language}" (expected: "${ADDITIONAL_DATA.userSettings.language}")`
        );
      }
      return { test: testName, status: true };
    } catch (e) {
      return { test: testName, status: false, error: e.message };
    }
  }

  /**
   * Tests resetting data to default schema.
   */
  async function testReset(resetLocalData, getLocalDataStringify) {
    const testName = 'Reset Test';
    try {
      await resetLocalData();
      const dataString = getLocalDataStringify();

      if (JSON.stringify(JSON.parse(dataString)) !== JSON.stringify(LOCAL_DATA_SCHEMA)) {
        throw new Error(
          `Reset mismatch: expected "${JSON.stringify(
            LOCAL_DATA_SCHEMA
          )}", got "${dataString}"`
        );
      }
      return { test: testName, status: true };
    } catch (e) {
      return { test: testName, status: false, error: e.message };
    }
  }

  return null;
};

export default memo(LocalDataManager_TestRunner);
