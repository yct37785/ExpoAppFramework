import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import firebaseApp from '../FirebaseConfig';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
const _ = require('lodash');

/**
 * Firebase Firestore manager.
 * 
 * @param {Object} firebaseApp - Firebase app created with project config.
 */
const useFirestoreManager = () => {
  const db = getFirestore(firebaseApp);

  /**
   * Creates a collection with optional initial data.
   * 
   * @param {string} collectionName - Name of the collection.
   * @param {Object[]} [initialData=[]] - Optional initial documents to create.
   * 
   * @returns {Promise<boolean>} - True if created successfully.
   */
  const createCollection = async (collectionName, initialData = []) => {
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
  const createDocument = async (collectionName, docId, data) => {
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
  const readDocument = async (collectionName, docId) => {
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
  const updateDocument = async (collectionName, docId, data) => {
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
  const deleteDocument = async (collectionName, docId) => {
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
  const readAllDocuments = async (collectionName) => {
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
  const listenToDocument = (collectionName, docId, onChange) => {
    try {
      const docRef = doc(db, collectionName, docId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          onChange(docSnap.data());
        } else {
          console.warn(`Document ${docId} not found in ${collectionName}`);
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
  const deleteCollection = async (collectionName) => {
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
 * Context setup.
 */
const FirestoreContext = createContext({});

/**
 * Provider for context.
 */
export const FirestoreProvider = ({ children }) => {
  const firestoreManager = useFirestoreManager();
  return (
    <FirestoreContext.Provider value={firestoreManager}>
      {children}
    </FirestoreContext.Provider>
  );
};

/**
 * Context consumer hook.
 */
export const useFirestoreContext = () => useContext(FirestoreContext);
