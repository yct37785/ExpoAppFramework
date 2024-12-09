import React, { useEffect, memo } from 'react';
import { delayPromise } from '../Utility/GeneralUtility';
import { useFirestoreContext, FirestoreProvider } from '../DataManagement/FirestoreManager';

/**
 * Test runner for FirestoreManager.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onTestEnd - Callback when tests finish.
 */
const FirestoreManager_TestRunner = ({ onTestEnd }) => {
  const className = "FirestoreManager";
  const {
    createCollection, createDocument, readDocument,
    updateDocument, deleteDocument, readAllDocuments,
    listenToDocument, deleteCollection
  } = useFirestoreContext();

  useEffect(() => {
    runTests();
  }, []);

  async function runTests() {
    const results = [];

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

  async function testCreateCollection() {
    const result = await createCollection("TestCollection", [{ name: "Test1" }, { name: "Test2" }]);
    return result;
  }

  async function testCreateDocument() {
    const result = await createDocument("TestCollection", "TestDoc", { name: "Sample" });
    return result;
  }

  async function testReadDocument() {
    const doc = await readDocument("TestCollection", "TestDoc");
    return doc?.name === "Sample";
  }

  async function testUpdateDocument() {
    const updated = await updateDocument("TestCollection", "TestDoc", { name: "Updated" });
    const doc = await readDocument("TestCollection", "TestDoc");
    return updated && doc?.name === "Updated";
  }

  async function testDeleteDocument() {
    const deleted = await deleteDocument("TestCollection", "TestDoc");
    const doc = await readDocument("TestCollection", "TestDoc");
    return deleted && !doc;
  }

  async function testReadAllDocuments() {
    const docs = await readAllDocuments("TestCollection");
    return Array.isArray(docs) && docs.length > 0;
  }

  async function testListenToDocument() {
    let status = false;
  
    // Set initial value
    await createDocument("TestCollection", "TestDoc", { value: "initial" });
  
    // Listen to document changes
    const unsubscribe = listenToDocument("TestCollection", "TestDoc", (docData) => {
      if (docData.value === "updated") {
        status = true;
        unsubscribe(); // Stop listening after detecting the change
      }
    });
  
    // Simulate an update
    await updateDocument("TestCollection", "TestDoc", { value: "updated" });
  
    // Wait briefly to ensure listener catches the change
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    return status;
  }

  async function testDeleteCollection() {
    const deleted = await deleteCollection("TestCollection");
    const docs = await readAllDocuments("TestCollection");
    return deleted && docs.length === 0;
  }

  return null;
}

/* ----------- PROVIDER WRAPPER ----------- */

const FirestoreProviderWrapper = ({ onTestEnd }) => (
  <FirestoreProvider>
    <FirestoreManager_TestRunner onTestEnd={onTestEnd} />
  </FirestoreProvider>
);

export default memo(FirestoreProviderWrapper);
