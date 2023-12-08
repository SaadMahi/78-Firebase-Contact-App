// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; //self
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoEP2AoE9kG0Xi9a8GG8bI-4eXtHf3SAY",
  authDomain: "contact-application-vite.firebaseapp.com",
  projectId: "contact-application-vite",
  storageBucket: "contact-application-vite.appspot.com",
  messagingSenderId: "634598803590",
  appId: "1:634598803590:web:b02af7bd417f52a9156907"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) //self