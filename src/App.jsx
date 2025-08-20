import React, { useEffect } from "react";
import Router from "./router/Router";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearCart, fetchCart } from "./redux/slice/cartSlice";
import { auth } from "./config/firebase.config";
import { clearUser } from "./redux/slice/userSlice";
import { fetchOrders } from "./redux/slice/ordersSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchCart(user.uid));
        dispatch(fetchOrders(user.uid));
      } else {
        dispatch(clearUser());
        dispatch(clearCart());
      }
    });

    return unsubscribe;
  }, []);

  return <Router />;
}
