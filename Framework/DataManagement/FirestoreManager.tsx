import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import firebaseApp from '../FirebaseConfig';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { IFirestoreManagerProps } from '../Index/PropType';
const _ = require('lodash');

/**
 * Firebase Firestore manager hook.
 */
const useFirestoreManager = (): IFirestoreManagerProps => {
  const db = getFirestore(firebaseApp);

  /**
   * Creates a collection with optional initial data.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {Object[]} [initialData=[]] - Optional initial documents to create.
   * 
   * @returns {Promise<boolean>} - True if created successfully.
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
    } catch (error) {
      console.error(`Error creating collection: ${error.message}`);
      throw error;
    }
  };

  /**
   * Creates or overwrites a document.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {string} docId - Document ID.
   * @param {Object} data - Document data.
   * 
   * @returns {Promise<boolean>} - True if successful.
   */
  const createDocument = async (collectionName: string, docId: string, data: object): Promise<boolean> => {
    try {
      await setDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error) {
      console.error(`Error creating document: ${error.message}`);
      throw error;
    }
  };

  /**
   * Reads a document by ID.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {string} docId - Document ID.
   * 
   * @returns {Promise<Object|null>} - Document data or null if not found.
   */
  const readDocument = async (collectionName: string, docId: string): Promise<object | null> => {
    try {
      const docSnap = await getDoc(doc(db, collectionName, docId));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error(`Error reading document: ${error.message}`);
      throw error;
    }
  };

  /**
   * Updates fields in an existing document.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {string} docId - Document ID.
   * @param {Object} data - Fields to update.
   * 
   * @returns {Promise<boolean>} - True if successful.
   */
  const updateDocument = async (collectionName: string, docId: string, data: object): Promise<boolean> => {
    try {
      await updateDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error) {
      console.error(`Error updating document: ${error.message}`);
      throw error;
    }
  };

  /**
   * Deletes a document by ID.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {string} docId - Document ID.
   * 
   * @returns {Promise<boolean>} - True if deleted successfully.
   */
  const deleteDocument = async (collectionName: string, docId: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return true;
    } catch (error) {
      console.error(`Error deleting document: ${error.message}`);
      throw error;
    }
  };

  /**
   * Reads all documents from a collection.
   * 
   * @param {string} collectionName - Name of the collection.
   * 
   * @returns {Promise<Object[]>} - Array of documents.
   */
  const readAllDocuments = async (collectionName: string): Promise<object[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error reading all documents: ${error.message}`);
      throw error;
    }
  };

  /**
   * Listens for changes on a specific document.
   * 
   * @param {string} collectionName - The Firestore collection name.
   * @param {string} docId - The document ID to listen for.
   * @param {Function} onChange - Callback triggered when the document changes.
   * 
   * @returns {Function} A function to unsubscribe from the listener.
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
    } catch (error) {
      console.error(`Error listening to document: ${error.message}`);
      throw error;
    }
  };

  /**
   * Deletes an entire collection by deleting all its documents.
   * 
   * @param {string} collectionName - Name of the collection to delete.
   * @returns {Promise<boolean>} - True if successful.
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
    } catch (error) {
      console.error(`Error deleting collection: ${error.message}`);
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
