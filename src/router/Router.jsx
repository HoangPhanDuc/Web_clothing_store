import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Admin from "../pages/Admin/Admin";
import LoadingPage from "../pages/LoadingPage";
import NotFound from "../pages/NotFound";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import MyProfile from "../pages/User/MyProfile";
import Order from "../pages/User/Order";
import Product from "../pages/User/Product";
import ProductDetail from "../pages/User/ProductDetail";
import SignUp from "../pages/User/SignUp";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";
import ProtectedLayout from "./ProtectedLayout";
const Cart = lazy(() => import("../pages/User/Cart"));

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/my-profile" element={<MyProfile />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/orders"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Order />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
