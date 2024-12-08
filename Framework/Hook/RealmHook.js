import { useState, useEffect } from 'react';
import Realm from 'realm';

export function useRealmStorage(schemaDefinitions) {
  const [realm, setRealm] = useState(null);
  const [data, setData] = useState({});

  // Initialize Realm
  useEffect(() => {
    const initializeRealm = async () => {
      try {
        const realmInstance = await Realm.open({
          schema: schemaDefinitions,
        });
        setRealm(realmInstance);

        // Set up listeners for each schema
        schemaDefinitions.forEach((schema) => {
          const collection = realmInstance.objects(schema.name);
          const listener = () => {
            setData((prev) => ({
              ...prev,
              [schema.name]: [...collection],
            }));
          };
          collection.addListener(listener);
        });
      } catch (error) {
        console.error('Realm initialization error:', error);
      }
    };

    initializeRealm();

    return () => {
      realm?.close();
    };
  }, [schemaDefinitions]);

  // General function to write an entry
  const writeEntry = (schemaName, data) => {
    try {
      realm.write(() => {
        realm.create(schemaName, data, Realm.UpdateMode.Modified);
      });
    } catch (error) {
      console.error(`Error writing to ${schemaName}:`, error);
    }
  };

  // General function to read entries
  const readEntries = (schemaName, filter = null) => {
    try {
      const results = filter
        ? realm.objects(schemaName).filtered(filter)
        : realm.objects(schemaName);
      return [...results];
    } catch (error) {
      console.error(`Error reading from ${schemaName}:`, error);
      return [];
    }
  };

  return {
    data,         // Reactive state
    writeEntry,   // Function to add or update
    readEntries,  // Function to fetch on-demand
  };
}
