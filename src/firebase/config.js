import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJVf7GiNvWG22pqxRHmhHXu5WflNzkyoA",
  authDomain: "group-randomizer-59197.firebaseapp.com",
  projectId: "group-randomizer-59197",
  storageBucket: "group-randomizer-59197.appspot.com",
  messagingSenderId: "182940550722",
  appId: "1:182940550722:web:bd9d3f0f9dd4c0ec10cfdb",
};

//init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

//init firebase auth
const auth = getAuth();

export { db, auth };
