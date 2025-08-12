import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config";

export const addToCartAPI = async (data, userId) => {
  const ref = collection(db, "Cart");
  const cartData = { ...data, userId: userId };
  await setDoc(doc(ref), cartData);
  return true;
};

export const getCartAPI = async (userId) => {
  const ref = collection(db, "Cart");
  const q = query(ref, where("userId", "==", userId));
  const cartsSnapshot = await getDocs(q);
  const carts = cartsSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  return carts;
};
