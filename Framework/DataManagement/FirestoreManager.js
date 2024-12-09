import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
const _ = require('lodash');

/**
 * Firebase Firestore manager.
 * 
 * @param {Object} firebaseApp - Firebase app created with project config.
 */
const useFirestoreManager = (firebaseApp) => {
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
      return false;
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
      return false;
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
      return null;
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
      return false;
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
      return false;
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
      return [];
    }
  };

  return {
    createCollection,
    createDocument,
    readDocument,
    updateDocument,
    deleteDocument,
    readAllDocuments,
  };
};

/**
 * Context setup.
 */
const FirestoreContext = createContext({});

/**
 * Provider for context.
 */
export const FirestoreProvider = ({ children, firebaseConfig }) => {
  const firestoreManager = useFirestoreManager(firebaseConfig);
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
