import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.config";
import { signInWithGoogle } from "../Utils/feature.common";

const mapStateToProps = (state, ownProps) => {
  return {
    showPassword: state.showPassword.status,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showPasswordClick: () => {
      dispatch({ type: "SHOW_PASSWORD" });
    },
  };
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleShowPassword = () => {
    props.showPasswordClick();
  };

  const loginWithEmailandPass = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setMessage("You must enter your email and password!");
      }
      if (email && password.length < 6) {
        setMessage("Password is not less then 6 character!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInGoogle = () => {
    signInWithGoogle(auth, googleProvider, setMessage);
  };

  return (
    <div className="container w-100 vh-100 font-monospace">
      <div className="position-absolute bg-light top-50 start-50 translate-middle shadow container__login p-4">
        <form onSubmit={loginWithEmailandPass}>
          <div className="h2 text-center mt-2 mb-4">Login</div>
          <div className="m-3 d-md-flex justify-content-between box-login">
            <label className="me-1" htmlFor="email">
              Email
            </label>
            <div className="box-input">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
              />
            </div>
          </div>
          <div className="m-3 d-md-flex justify-content-between position-relative box-login">
            <label className="me-1" htmlFor="password">
              Password
            </label>
            <div className="position-absolute top-0 end-0 box-input">
              <input
                type={props.showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(click) => setPassword(click.target.value)}
              />
            </div>
            <div
              className="position-absolute bottom-0 end-0"
              onClick={() => toggleShowPassword()}
            >
              {props.showPassword ? (
                <i class="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>
          <div className="me-3 m-1 d-flex justify-content-end forgot-pass">
            <Link className="text-decoration-none" to="/">
              Forgot password?
            </Link>
          </div>
          <div className="w-100 p-0 m-0 mt-5 mt-md-4 text-center btn__opacity">
            <button
              type="submit"
              className="w-100 border-1 border-black text-bg-dark p-2"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-2">
          <button onClick={() => signInGoogle()} className="w-100 border-1 p-2">
            Continue with Google <i class="fa-brands fa-google"></i>
          </button>
        </div>
        <div className="w-100 m-0 mt-2 mb-2 text-center btn__opacity">
          <Link to="/sign-up">
            <button className="w-100 border-1 border-black text-bg-dark p-2">
              Create account
            </button>
          </Link>
        </div>
        <div className="text-center">{message && <p>{message}</p>}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
