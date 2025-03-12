import { FirestoreManagerProps } from '../Firebase/FirestoreHook';
import { handleError } from '../Utility';

/**
 * test Firestore functions
 */
export async function test_firestore({
  createCollection,
  createDocument,
  readDocument,
  deleteDocument,
  deleteCollection,
  readAllDocuments
}: FirestoreManagerProps) {
  let flag = false;
  
  flag = await createCollection("TestCollection", [{ name: "Test1" }, { name: "Test2" }]);
  if (!flag) {
    handleError(new Error('Error creating collection'), 'Firestore');
  }

  flag = await createDocument("TestCollection", "TestDoc", { name: "Sample" });
  if (!flag) {
    handleError(new Error('Error creating document'), 'Firestore');
  }

  const doc = await readDocument("TestCollection", "TestDoc");
  if (!doc || !('name' in doc)) {
    handleError(new Error('Error updating document'), 'Firestore');
  }

  flag = await deleteDocument("TestCollection", "TestDoc");
  const doc2 = await readDocument("TestCollection", "TestDoc");
  if (!flag || doc2) {
    handleError(new Error('Error deleting document'), 'Firestore');
  }

  flag = await deleteCollection("TestCollection");
  const docs = await readAllDocuments("TestCollection");
  if (!flag || docs.length !== 0) {
    handleError(new Error('Error deleting collection'), 'Firestore');
  }
};