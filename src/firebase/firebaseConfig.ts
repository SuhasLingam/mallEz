import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDf2OXyBW1iHRBhePQHqGGqTFpEpJVR8E",
  authDomain: "mallez-90070.firebaseapp.com",
  projectId: "mallez-90070",
  storageBucket: "mallez-90070.appspot.com",
  messagingSenderId: "961060632898",
  appId: "1:961060632898:web:4bfc25b7e5eebcd84130db",
  measurementId: "G-5B687TRDKS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
