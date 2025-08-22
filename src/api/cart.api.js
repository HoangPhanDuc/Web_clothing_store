import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config";

export const addToCartAPI = async (data, userId) => {
  const ref = collection(db, "Cart");

  const cartData = {
    productId: data.id,
    userId: userId,
    quantity: data.quantity,
    priceAddAt: data.price,
    addedAt: serverTimestamp(),
  };
  await setDoc(doc(ref), cartData);
  return true;
};

export const getCartAPI = async (userId) => {
  const refCart = collection(db, "Cart");
  const q = query(refCart, where("userId", "==", userId));
  const cartsSnapshot = await getDocs(q);

  if (cartsSnapshot.empty) return [];
  const cartsWithProducts = await Promise.all(
    cartsSnapshot.docs.map(async (cartDoc) => {
      const cartData = cartDoc.data();
      const productRef = doc(db, "Product", cartData.productId);
      const productSnap = await getDoc(productRef);
      return {
        id: cartDoc.id,
        ...cartData,
        addedAt: cartData.addedAt?.toDate().getTime() ?? null,
        product: productSnap.exists() ? productSnap.data() : null,
      };
    })
  );

  return cartsWithProducts;
};

export const checkoutAPI = async (orderData) => {
  await runTransaction(db, async (transaction) => {
    const productSnaps = {};
    
    for (const item of orderData.items) {
      const productRef = doc(db, "Product", item.productId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error(`Product ${item.productId} not found`);
      }

      const currentStock = productSnap.data().quantity || 0;
      if (currentStock < item.quantity) {
        throw new Error(`Not enough stock for ${item.productId}`);
      }

      productSnaps[item.productId] = {
        ref: productRef,
        stock: currentStock,
        quantity: item.quantity,
      };
    }

    const cartQuery = query(
      collection(db, "Cart"),
      where("userId", "==", orderData.userId)
    );
    const cartSnapshot = await getDocs(cartQuery);
    const cartDocs = [];
    cartSnapshot.forEach((docSnap) => {
      cartDocs.push(docSnap.ref);
    });

    const refOrders = collection(db, "Orders");
    const orderDocRef = doc(refOrders);
    transaction.set(orderDocRef, orderData);

    for (const pid in productSnaps) {
      const { ref, stock, quantity } = productSnaps[pid];
      transaction.update(ref, { quantity: stock - quantity });
    }

    for (const ref of cartDocs) {
      transaction.delete(ref);
    }
  });

  return true;
};

export const updateCartItem = async (id, quantity) => {
  const cartItemRef = doc(db, "Cart", id);
  await updateDoc(cartItemRef, { quantity: quantity });
  return { id, quantity };
};

export const deleteCartById = async (id) => {
  const cartRef = doc(db, "Cart", id);
  await deleteDoc(cartRef);
  return true;
};
