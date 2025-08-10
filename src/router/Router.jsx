import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import SignUp from "../pages/User/SignUp";
import Cart from "../pages/User/Cart";
import ProductDetail from "../components/ProductDetail";
import Products from "../components/Products";
import Admin from "../pages/Admin/Admin";
import ProtectedLayout from "./ProtectedLayout";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";
import NotFound from "../pages/NotFound";
import { ToastContainer } from "react-toastify";

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
          <Route path="/products" element={<Products />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Route>
        </Route>

        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
