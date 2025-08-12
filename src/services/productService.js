import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const fetchProductsAPI = async () => {
  const productCollectionRef = collection(db, "Product");
  const queryProducts = await getDocs(productCollectionRef);
  return queryProducts.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getOneProductAPI = async (id) => {
  const oneProductCollectionRef = doc(db, "Product", id);
  const getOneProduct = await getDoc(oneProductCollectionRef);
  return { id: getOneProduct.id, ...getOneProduct.data() };
};
