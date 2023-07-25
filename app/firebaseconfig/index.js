// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//getAuth for authentication, getFirestore for database, getStorage to store any uploaded file/image
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF_xZA_Q5URn9N75dhqU4PewDNdMVZTtI",
  authDomain: "triveous-cb192.firebaseapp.com",
  projectId: "triveous-cb192",
  storageBucket: "triveous-cb192.appspot.com",
  messagingSenderId: "62317991052",
  appId: "1:62317991052:web:9f853d92d7bfa63a47d7a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db = getFirestore(app)