// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4gl8OsLh5Gfi1MTOkSkT-ORyS--4EnLY",
  authDomain: "help-fd14d.firebaseapp.com",
  projectId: "help-fd14d",
  storageBucket: "help-fd14d.appspot.com",
  messagingSenderId: "458367144333",
  appId: "1:458367144333:web:476603d92e5a5cd4a6adc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, app };
