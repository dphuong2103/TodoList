import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: 'AIzaSyA8IktUZavSPRIfsPUgBrjM_qkmNRTqA6s',
  authDomain: 'todolist-e995a.firebaseapp.com',
  projectId: 'todolist-e995a',
  storageBucket: 'todolist-e995a.appspot.com',
  messagingSenderId: '520624291021',
  appId: '1:520624291021:web:26211529192cbdec5f7d84',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const db = getDatabase(app);
