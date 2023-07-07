import { openDB } from 'idb';

// Function to initialize the database
const initializeDatabase = async () => {
  // Open the 'myDatabase' with version 1
  // If the database doesn't exist, the 'upgrade' callback will be called
  const database = await openDB('myDatabase', 1, {
    upgrade(db) {
      // Check if the 'myObjectStore' already exists in the database
      if (db.objectStoreNames.contains('myObjectStore')) {
        console.log('myObjectStore database already exists');
        return;
      }

      // Create a new object store 'myObjectStore' with a key path of 'id' and auto-increment enabled
      db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
      console.log('myObjectStore database created');
    },
  });
};

// Method to add content to the database
export const addToDatabase = async (content) => {
  console.log('Adding content to the database');

  // Open a connection to 'myDatabase' with version 1
  const database = await openDB('myDatabase', 1);

  // Create a new transaction with 'readwrite' access to the 'myObjectStore'
  const transaction = database.transaction('myObjectStore', 'readwrite');

  // Get the object store 'myObjectStore'
  const objectStore = transaction.objectStore('myObjectStore');

  // Use the 'put()' method on the object store to add the content to the database
  const request = objectStore.put({ id: 1, value: content });

  // Wait for the request to complete and get the result
  const result = await request;
  console.log('🚀 - Data saved to the database', result);
};

// Method to fetch all content from the database
export const getAllFromDatabase = async () => {
  console.log('Fetching data from the database');

  // Open a connection to 'myDatabase' with version 1
  const database = await openDB('myDatabase', 1);

  // Create a new transaction with 'readonly' access to the 'myObjectStore'
  const transaction = database.transaction('myObjectStore', 'readonly');

  // Get the object store 'myObjectStore'
  const objectStore = transaction.objectStore('myObjectStore');

  // Use the 'getAll()' method on the object store to fetch all data from the database
  const request = objectStore.getAll();

  // Wait for the request to complete and get the result
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Initialize the database
initializeDatabase();
