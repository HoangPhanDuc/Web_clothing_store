import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "../assets/css/header.css";

export default function Header() {
  return (
    <header className="container-fluid sticky-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container py-2">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          C-Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <Nav />
        </div>
      </nav>
    </header>
  );
}
