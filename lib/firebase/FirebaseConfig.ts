import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const firebaseApp: FirebaseApp = initializeApp(FirebaseConfig);
const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore();
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

export { firebaseApp, auth, googleProvider, db };
