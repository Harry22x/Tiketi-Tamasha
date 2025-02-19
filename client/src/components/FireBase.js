import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import { 
  getFirestore, 
  enableIndexedDbPersistence 
} from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// ✅ Initialize Firebase Once
const firebaseConfig = {
  apiKey: "AIzaSyAP17QKLMzp8fIJb_oAlgARDlDt7RWfmjE",
  authDomain: "myeventmanagementpr.firebaseapp.com",
  projectId: "myeventmanagementpr",
  storageBucket: "myeventmanagementpr.appspot.com",
  messagingSenderId: "89693557248",
  appId: "1:89693557248:web:d873dfac0cd91c2b803ee5",
  measurementId: "G-GL6GM6CZME"
};

// ✅ Ensure App is Initialized Before Using Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
  console.error("Firestore Persistence Error:", err);
});

export { 
  app, auth, db, storage, googleProvider, 
  signInWithPopup, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber 
};








