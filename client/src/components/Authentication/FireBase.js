import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAP17QKLMzp8fIJb_oAlgARDlDt7RWfmjE",
  authDomain: "myeventmanagementpr.firebaseapp.com",
  projectId: "myeventmanagementpr",
  storageBucket: "myeventmanagementpr.firebasestorage.app",
  messagingSenderId: "89693557248",
  appId: "1:89693557248:web:d873dfac0cd91c2b803ee5",
  measurementId: "G-GL6GM6CZME"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();