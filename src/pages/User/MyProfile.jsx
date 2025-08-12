import React from "react";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const userData = useSelector((state) => state.userStore);

  return (
    <div className="min-vh-100 text-center">
      <div>Name: {userData.name}</div>
      <div>Email: {userData.email}</div>
      <div>
        Avatar: <img src={userData.photo} alt="avatar" />
      </div>
    </div>
  );
}
