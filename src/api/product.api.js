import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, imageDB } from "../config/firebase.config";

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

export const deleteProductAdminAPI = async (id) => {
  const docRef = doc(db, "Product", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (data.imagePath) {
      const imageRef = ref(imageDB, data.imagePath);
      await deleteObject(imageRef);
    } else throw new Error(`Can not deleted for ${data.imagePath}`);

    await deleteDoc(docRef);
  }
  return true;
};

export const addProductAdminAPI = async (values, imageFile) => {
  let imageUrl = "";
  let imagePath = "";

  if (imageFile) {
    const path = `images/${Date.now()}-${imageFile.name}`;
    const imageRef = ref(imageDB, path);
    await uploadBytes(imageRef, imageFile);
    imageUrl = await getDownloadURL(imageRef);
    imagePath = path;
  }

  const productCollectionRef = collection(db, "Product");
  const docRef = await addDoc(productCollectionRef, {
    ...values,
    price: Number(values.price),
    quantity: Number(values.quantity),
    image: imageUrl,
    imagePath,
    createdAt: new Date(),
  });

  return { id: docRef.id, ...values, image: imageUrl, imagePath };
};

export const updateProductAdminAPI = async (id, values, imageFile) => {
  const docRef = doc(db, "Product", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("Product not found");

  let updatedData = {
    ...values,
    price: Number(values.price),
    quantity: Number(values.quantity),
    updatedAt: new Date(),
  };

  if (imageFile) {
    const oldData = docSnap.data();
    if (oldData.imagePath) {
      const oldImageRef = ref(imageDB, oldData.imagePath);
      await deleteObject(oldImageRef);
    }

    const newPath = `images/${Date.now()}-${imageFile.name}`;
    const imageRef = ref(imageDB, newPath);
    await uploadBytes(imageRef, imageFile);
    const newUrl = await getDownloadURL(imageRef);

    updatedData.image = newUrl;
    updatedData.imagePath = newPath;
  }

  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};
