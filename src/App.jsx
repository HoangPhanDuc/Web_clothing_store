import Aos from "aos";
import "aos/dist/aos.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase.config";
import { clearCart, fetchCart } from "./redux/slice/cartSlice";
import { fetchOrders } from "./redux/slice/ordersSlice";
import { clearUser } from "./redux/slice/userSlice";
import Router from "./router/Router";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);

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
