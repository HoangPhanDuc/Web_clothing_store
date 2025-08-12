import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";
// import Cart from "../pages/User/Cart";
import ProductDetail from "../components/ProductDetail";
import Admin from "../pages/Admin/Admin";
import ProtectedLayout from "./ProtectedLayout";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";
import NotFound from "../pages/NotFound";
import Order from "../pages/User/Order";
import MyProfile from "../pages/User/MyProfile";
import Product from "../pages/User/Product";
import Loading from "../components/Loading";
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
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route path="/orders" element={<Order />} />
          </Route>
        </Route>

        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
