import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, FirebaseError } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyByN4sfDbf1Ave-yWRM3WeV4xmgW1c5ZN0",
    authDomain: "yovistoasi-fecb6.firebaseapp.com",
    projectId: "yovistoasi-fecb6",
    storageBucket: "yovistoasi-fecb6.appspot.com",
    messagingSenderId: "862566924315",
    appId: "1:862566924315:web:cf8272d7e09d53d90738be"
  };

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);
