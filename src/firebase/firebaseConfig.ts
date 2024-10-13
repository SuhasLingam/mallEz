import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? throwEnvError('VITE_FIREBASE_API_KEY'),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? throwEnvError('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? throwEnvError('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? throwEnvError('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? throwEnvError('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? throwEnvError('VITE_FIREBASE_APP_ID'),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? throwEnvError('VITE_FIREBASE_MEASUREMENT_ID'),
};

function throwEnvError(envVar: string): never {
  throw new Error(`Missing environment variable: ${envVar}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };