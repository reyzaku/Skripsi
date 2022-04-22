// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_kQqCCteISQ-4np2LxfcKkxeWL6EXWMk",
  authDomain: "aisha-collection.firebaseapp.com",
  projectId: "aisha-collection",
  storageBucket: "aisha-collection.appspot.com",
  messagingSenderId: "712714545707",
  appId: "1:712714545707:web:64b2dc56f9145ee77a186e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;