import React, { useEffect, memo } from 'react';
import { useFirestoreContext } from './Firebase/FirestoreHook';
import { test_firestore } from './Firebase/FirestoreTest';

/**
 * test runner component
 */
const TestRunner: React.FC = () => {
  const firestore = useFirestoreContext();

  useEffect(() => {
    if (!firestore) return;
    run_tests();
  }, []);

  async function run_tests() {
    console.log('Starting tests...');
    await test_firestore(firestore);
    console.log('Tests completed...');
  }

  return null;
};

export default memo(TestRunner);