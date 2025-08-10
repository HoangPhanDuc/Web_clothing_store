import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slice/userSlice";
import "../assets/css/nav.css";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userStore?.accessToken);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
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
      <li className="nav-item">
        <Link className="nav-link text-uppercase" to="/cart">
          Cart
        </Link>
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
          <i className="fa-solid fa-user fa-lg"></i>
        </span>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="accountDropdown"
        >
          {!userData ? (
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
                <Link className="dropdown-item" to="/myprofile">
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
