import React, { useEffect, memo } from 'react';
import { delayPromise } from '../Utility/GeneralUtility';
import { useFirestoreContext, FirestoreProvider } from '../DataManagement/FirestoreManager';
import { OnTestEndResultsList, ITestRunnerProps } from '../Index/PropType';

/**
 * Test runner for FirestoreManager.
 */
const FirestoreManager_TestRunner: React.FC<ITestRunnerProps> = ({ onTestEnd }) => {
  const className = "FirestoreManager";
  const {
    createCollection, createDocument, readDocument,
    updateDocument, deleteDocument, readAllDocuments,
    listenToDocument, deleteCollection
  } = useFirestoreContext();

  useEffect(() => {
    runTests();
  }, []);

  /**
   * Runs all tests for this module synchronously.
   */
  async function runTests(): Promise<void> {
    const results: OnTestEndResultsList = [];

    results.push({ test: 'Create Collection', status: await testCreateCollection() });
    results.push({ test: 'Create Document', status: await testCreateDocument() });
    results.push({ test: 'Read Document', status: await testReadDocument() });
    results.push({ test: 'Update Document', status: await testUpdateDocument() });
    results.push({ test: 'Delete Document', status: await testDeleteDocument() });
    results.push({ test: 'Read All Documents', status: await testReadAllDocuments() });
    results.push({ test: 'Listen to Document', status: await testListenToDocument() });
    results.push({ test: 'Delete Collection', status: await testDeleteCollection() });

    onTestEnd(className, results);
  }

  async function testCreateCollection(): Promise<boolean> {
    const result = await createCollection("TestCollection", [{ name: "Test1" }, { name: "Test2" }]);
    return result;
  }

  async function testCreateDocument(): Promise<boolean> {
    const result = await createDocument("TestCollection", "TestDoc", { name: "Sample" });
    return result;
  }

  async function testReadDocument(): Promise<boolean> {
    const doc = await readDocument("TestCollection", "TestDoc");
    if (doc && 'name' in doc) {
      return doc?.name === "Sample";
    }
    return false;
  }

  async function testUpdateDocument(): Promise<boolean> {
    const updated = await updateDocument("TestCollection", "TestDoc", { name: "Updated" });
    const doc = await readDocument("TestCollection", "TestDoc");
    if (doc && 'name' in doc) {
      return updated && doc?.name === "Updated";
    }
    return false;
  }

  async function testDeleteDocument(): Promise<boolean> {
    const deleted = await deleteDocument("TestCollection", "TestDoc");
    const doc = await readDocument("TestCollection", "TestDoc");
    return deleted && !doc;
  }

  async function testReadAllDocuments(): Promise<boolean> {
    const docs = await readAllDocuments("TestCollection");
    return Array.isArray(docs) && docs.length > 0;
  }

  async function testListenToDocument(): Promise<boolean> {
    let status = false;

    // set initial value
    await createDocument("TestCollection", "TestDoc", { value: "initial" });

    // listen to document changes
    const unsubscribe = listenToDocument("TestCollection", "TestDoc", (docData) => {
      if (docData && 'value' in docData) {
        status = docData.value === "updated";
        unsubscribe(); // stop listening after detecting the change
      }
    });

    // simulate an update
    await updateDocument("TestCollection", "TestDoc", { value: "updated" });

    // wait briefly to ensure listener catches the change
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return status;
  }

  async function testDeleteCollection(): Promise<boolean> {
    const deleted = await deleteCollection("TestCollection");
    const docs = await readAllDocuments("TestCollection");
    return deleted && docs.length === 0;
  }

  return null;
}

/* ----------- PROVIDER WRAPPER ----------- */

const FirestoreProviderWrapper: React.FC<{ onTestEnd: ITestRunnerProps['onTestEnd'] }> = ({ onTestEnd }) => (
  <FirestoreProvider>
    <FirestoreManager_TestRunner onTestEnd={onTestEnd} />
  </FirestoreProvider>
);

export default memo(FirestoreProviderWrapper);
