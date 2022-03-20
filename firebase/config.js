import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'firebase/storage';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyDiiPLBZKlIjzQxElgB4oX7fPe0kc9LLGc",
  authDomain: "code-wick.firebaseapp.com",
  projectId: "code-wick",
  storageBucket: "code-wick.appspot.com",
  messagingSenderId: "353351981639",
  appId: "1:353351981639:web:2793ad98e809082c5e2f62",
  measurementId: "G-6T72STQ94S"
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const Storage = getStorage(firebaseApp);