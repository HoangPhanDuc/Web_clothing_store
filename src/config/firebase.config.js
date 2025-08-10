import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCXnEbRVmXqTif2ZY5stl5aoCF19MvtqvU",
  authDomain: "clo-shop-13b0e.firebaseapp.com",
  projectId: "clo-shop-13b0e",
  storageBucket: "clo-shop-13b0e.appspot.com",
  messagingSenderId: "470494755108",
  appId: "1:470494755108:web:02cacbbadf27ad6683dbb1",
  measurementId: "G-7ZF08CSRDE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const imageDB = getStorage(app);
