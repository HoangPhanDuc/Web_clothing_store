import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const handleOfClick = useNavigate();

  return (
    <div className="container-fluid sticky-top">
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand nav__brand" href="http://localhost:3000/">
            C-Shop
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown drop__content">
                <a
                  className="nav-link active ms-2 me-2 text-uppercase"
                  href=".."
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Lastest
                </a>
                <div
                  className="dropdown-menu drop__down rounded-0"
                  aria-labelledby="dropdownId"
                >
                  <div className="row row-cols-3">
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Men
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Women
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Bag
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Kid
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shoes
                      </a>
                      <a className="dropdown-item" href="..">
                        Hats
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown drop__content">
                <a
                  className="nav-link active ms-2 me-2 text-uppercase"
                  href=".."
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Designer
                </a>
                <div
                  className="dropdown-menu drop__down rounded-0"
                  aria-labelledby="dropdownId"
                >
                  <div className="row row-cols-3">
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Men
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Women
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Bag
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <a
                        className="h6 p-0 ps-2 text-uppercase"
                        href="http://localhost:3000/products"
                      >
                        Kid
                      </a>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shoes
                      </a>
                      <a className="dropdown-item" href="..">
                        Hats
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown drop__content">
                <a
                  className="nav-link active ms-2 me-2 text-uppercase"
                  href=".."
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  sales
                </a>
                <div
                  className="dropdown-menu drop__down rounded-0"
                  aria-labelledby="dropdownId"
                >
                  <div className="row row-cols-3">
                    <div className="col p-3 ps-sm-5">
                      <div className="h6 p-0 ps-2">MEN</div>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <div className="h6 p-0 ps-2">WOMEN</div>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Bag
                      </a>
                      <a className="dropdown-item" href="..">
                        Footwear
                      </a>
                    </div>
                    <div className="col p-3 ps-sm-5">
                      <div className="h6 p-0 ps-2">KID</div>
                      <a className="dropdown-item" href="..">
                        T-Shirts
                      </a>
                      <a className="dropdown-item" href="..">
                        Shoes
                      </a>
                      <a className="dropdown-item" href="..">
                        Hats
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li
                onClick={() => handleOfClick("/cart")}
                className="nav-item ms-3 me-3 d-sm-flex align-items-center b__cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </li>
              <li className="nav-item ms-3 me-3 mt-0 me-2 dropdown d-block align-items-center d-md-none">
                <span
                  className="nav-link active"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-user"></i>
                </span>
                <div
                  className="dropdown-menu rounded-0 bg-white"
                  aria-labelledby="dropdownId"
                >
                  <a className="dropdown-item" href="http://localhost:3000/login">
                    Login
                  </a>
                  <a className="dropdown-item" href="http://localhost:3000/sign-up">
                    Sign up
                  </a>
                </div>
              </li>
            </ul>
            <form className="d-flex my-2 my-lg-0">
              <input
                className="me-sm-2 border border-1 border-black"
                type="text"
                placeholder="Search"
              />
              <button
                className="ms-2 m-sm-0 btn btn-outline-dark rounded-0 my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
