import { useNavigate } from "react-router-dom";
import "./login.css";

const { useState } = require("react");

const Login = () => {
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOfClick = useNavigate();

  return (
    <div className="container w-100 vh-100 font-monospace">
      <form action="">
        <div className="position-absolute bg-light top-50 start-50 translate-middle shadow p-4 container__login">
          <div className="h2 text-center mt-2 mb-4">Login</div>
          <div className="m-3 d-flex box-login">
            <label className="me-1" htmlFor="username">
              User name
            </label>
            <div className="box-input">
              <input type="text" name="username" id="username" />
            </div>
          </div>
          <div className="m-3 d-flex position-relative box-login">
            <label className="me-1" htmlFor="password">
              Password
            </label>
            <div className="position-absolute top-0 end-0 box-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(click) => setPassword(click.target.value)}
              />
            </div>
            <div
              className="position-absolute bottom-0 end-0"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <i class="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>
          <div className="me-3 m-1 d-flex justify-content-end forgot-pass">
            <a className="text-decoration-none" href="..">
              Forgot password?
            </a>
          </div>
          <div className="w-100 p-0 m-0 mt-5 mt-md-4 text-center btn__opacity">
            <button className="w-100 border-1 border-black text-bg-dark ps-5 pe-5 p-2">
              Login
            </button>
          </div>
          <div className="w-100 m-0 mt-3 mb-2 text-center btn__opacity">
            <button
              onClick={() => {
                handleOfClick("/sign-up");
              }}
              className="w-100 border-1 border-black text-bg-dark ps-5 pe-5 p-2"
            >
              Create account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
