import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import firebaseApp from '../FirebaseConfig';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { handleError } from '../Utility/GeneralUtility';

/**
 * Firebase props
 */
interface IFirestoreManagerProps {
  createCollection: (collectionName: string, initialData?: object[]) => Promise<boolean>;
  createDocument: (collectionName: string, docId: string, data: object) => Promise<boolean>;
  readDocument: (collectionName: string, docId: string) => Promise<object | null>;
  updateDocument: (collectionName: string, docId: string, data: object) => Promise<boolean>;
  deleteDocument: (collectionName: string, docId: string) => Promise<boolean>;
  readAllDocuments: (collectionName: string) => Promise<object[]>;
  listenToDocument: (collectionName: string, docId: string, onChange: (data: object) => void) => () => void;
  deleteCollection: (collectionName: string) => Promise<boolean>;
};

/**
 * Firebase Firestore manager hook.
 */
const useFirestoreManager = (): IFirestoreManagerProps => {
  const db = getFirestore(firebaseApp);

  /**
   * Creates a collection with optional initial data.
   * 
   * @param collectionName - Name of the collection.
   * @param initialData - Optional initial documents to create.
   * 
   * @returns True if created successfully.
   */
  const createCollection = async (collectionName: string, initialData: object[] = []): Promise<boolean> => {
    try {
      if (!collectionName) throw new Error("Collection name is required.");

      const batchWrites = initialData.map(async (data) => {
        const docRef = doc(collection(db, collectionName));
        await setDoc(docRef, data);
      });

      await Promise.all(batchWrites);
      return true;
    } catch (error: unknown) {
      handleError(error, 'Error creating collection');
      throw error;
    }
  };

  /**
   * Creates or overwrites a document.
   * 
   * @param collectionName - Name of the collection.
   * @param docId - Document ID.
   * @param data - Document data.
   * 
   * @returns True if successful.
   */
  const createDocument = async (collectionName: string, docId: string, data: object): Promise<boolean> => {
    try {
      await setDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error: unknown) {
      handleError(error, 'Error creating document');
      throw error;
    }
  };

  /**
   * Reads a document by ID.
   * 
   * @param collectionName - Name of the collection.
   * @param docId - Document ID.
   * 
   * @returns Document data or null if not found.
   */
  const readDocument = async (collectionName: string, docId: string): Promise<object | null> => {
    try {
      const docSnap = await getDoc(doc(db, collectionName, docId));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error: unknown) {
      handleError(error, 'Error reading document');
      throw error;
    }
  };

  /**
   * Updates fields in an existing document.
   * 
   * @param collectionName - Name of the collection.
   * @param docId - Document ID.
   * @param data - Fields to update.
   * 
   * @returns True if successful.
   */
  const updateDocument = async (collectionName: string, docId: string, data: object): Promise<boolean> => {
    try {
      await updateDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error: unknown) {
      handleError(error, 'Error updating document');
      throw error;
    }
  };

  /**
   * Deletes a document by ID.
   * 
   * @param collectionName - Name of the collection.
   * @param docId - Document ID.
   * 
   * @returns True if deleted successfully.
   */
  const deleteDocument = async (collectionName: string, docId: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return true;
    } catch (error: unknown) {
      handleError(error, 'Error deleting document');
      throw error;
    }
  };

  /**
   * Reads all documents from a collection.
   * 
   * @param collectionName - Name of the collection.
   * 
   * @returns Array of documents.
   */
  const readAllDocuments = async (collectionName: string): Promise<object[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error: unknown) {
      handleError(error, 'Error reading all documents');
      throw error;
    }
  };

  /**
   * Listens for changes on a specific document.
   * 
   * @param collectionName - The Firestore collection name.
   * @param docId - The document ID to listen for.
   * @param onChange - Callback triggered when the document changes.
   * 
   * @returns A function to unsubscribe from the listener.
   */
  const listenToDocument = (collectionName: string, docId: string, onChange: (data: object) => void): (() => void) => {
    try {
      const docRef = doc(db, collectionName, docId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          onChange(docSnap.data());
        } else {
          console.warn(`Document ${docId} not found in ${collectionName}`);
          throw new Error('404');
        }
      });
      return unsubscribe;
    } catch (error: unknown) {
      handleError(error, 'Error listening to document');
      throw error;
    }
  };

  /**
   * Deletes an entire collection by deleting all its documents.
   * 
   * @param collectionName - Name of the collection to delete.
   * @returns True if successful.
   */
  const deleteCollection = async (collectionName: string): Promise<boolean> => {
    try {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);

      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, collectionName, docSnap.id))
      );

      await Promise.all(deletePromises);
      return true;
    } catch (error: unknown) {
      handleError(error, 'Error deleting collection');
      throw error;
    }
  };

  return {
    createCollection,
    createDocument,
    readDocument,
    updateDocument,
    deleteDocument,
    readAllDocuments,
    listenToDocument,
    deleteCollection
  };
};

/**
 * Context setup for FirestoreManager
 */
const FirestoreContext = createContext<IFirestoreManagerProps | undefined>(undefined);

/**
 * Provider for Firestore context.
 */
interface IFirestoreProviderProps {
  children: ReactNode;
};

/**
 * Provider for context.
 */
export const FirestoreProvider: React.FC<IFirestoreProviderProps> = ({ children }) => {
  const firestoreManager = useFirestoreManager();
  return (
    <FirestoreContext.Provider value={firestoreManager}>
      {children}
    </FirestoreContext.Provider>
  );
};

/**
 * Context consumer hook for accessing FirestoreManager.
 */
export const useFirestoreContext = (): IFirestoreManagerProps => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestoreContext must be used within a FirestoreProvider');
  }
  return context;
};
