import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config";

export const getOrdersAPI = async (userId) => {
  const ref = collection(db, "Orders");
  const q = query(ref, where("userId", "==", userId));
  const ordersData = await getDocs(q);
  if (ordersData.empty) return [];
  const orderListData = await Promise.all(
    ordersData.docs.map(async (ordersDoc) => {
      const order = { id: ordersDoc.id, ...ordersDoc.data() };
      const itemsWithProduct = await Promise.all(
        order.items.map(async (item) => {
          const productRef = doc(db, "Product", item.productId);
          const productSnap = await getDoc(productRef);

          if (!productSnap.exists()) {
            return null;
          }

          const data = productSnap.data();
          return {
            ...item,
            product: { name: data.name, image: data.image },
          };
        })
      );
      return {
        ...order,
        ordersAt: order.ordersAt?.toDate().getTime() ?? null,
        items: itemsWithProduct,
      };
    })
  );

  return orderListData;
};
