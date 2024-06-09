// lib/firebase/FirebaseConfig.ts

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore();
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

export { firebaseApp, auth, googleProvider, db };
