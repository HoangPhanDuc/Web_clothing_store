import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const userData = useSelector((state) => state.userStore?.accessToken);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
