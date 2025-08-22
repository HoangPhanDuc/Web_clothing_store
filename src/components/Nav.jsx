import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/css/nav.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config.js";
import { toast } from "react-toastify";

export default function Nav() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userStore);
  const cartCount = useSelector((state) => state.cartStore?.items?.length);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      toast.error("Error something!");
    }
  };

  return (
    <ul className="navbar-nav ms-auto align-items-center">
      {/* Home */}
      <li className="nav-item">
        <Link className="nav-link text-uppercase" to="/">
          Home
        </Link>
      </li>

      {/* Products */}
      <li className="nav-item">
        <Link className="nav-link text-uppercase" to="/products">
          Products
        </Link>
      </li>

      {/* Cart */}
      <li className="nav-item position-relative">
        <Link className="nav-link text-uppercase z-0" to="/cart">
          Cart
        </Link>
        {cartCount > 0 ? (
          <>
            <div
              style={{ fontSize: "12px" }}
              className="position-absolute top-0 end-0 text-danger fw-bold z-1"
            >
              {cartCount}
            </div>
          </>
        ) : null}
      </li>

      {/* Orders */}
      <li className="nav-item">
        <Link className="nav-link text-uppercase" to="/orders">
          Orders
        </Link>
      </li>

      {/* Search bar */}
      <li className="nav-item mx-2">
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control form-control-sm me-2 input-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ maxWidth: "250px", minWidth: "200px" }}
          />
          <button className="btn btn-outline-dark btn-sm" type="submit">
            Search
          </button>
        </form>
      </li>

      {/* Account dropdown */}
      <li className="nav-item dropdown mx-2">
        <span
          className="nav-link dropdown-toggle"
          id="accountDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
          title="Account"
        >
          {userData.photo ? (
            <>
              <img
                className="rounded-circle"
                style={{ width: "30px", height: "30px" }}
                src={userData.photo}
                alt="avatar"
              />
            </>
          ) : (
            <i className="fa-solid fa-user fa-lg"></i>
          )}
        </span>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="accountDropdown"
        >
          {!userData.accessToken ? (
            <>
              <li>
                <Link className="dropdown-item" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/sign-up">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="dropdown-item" to="/my-profile">
                  My Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </li>
    </ul>
  );
}
