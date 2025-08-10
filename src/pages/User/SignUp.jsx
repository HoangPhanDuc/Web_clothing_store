import { Link } from "react-router-dom";
import { auth, db, googleProvider } from "../../config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setMessage("You must enter your email and password!");
      }
      if (email && password.length < 6) {
        setMessage("Password is not less then 6 character!");
      } else {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userInfo.user;
        await setDoc(doc(db, "Roles", user.uid), {
          role: "user",
        });
        setMessage("Sign in successful!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const signUpWithGoogle = () => {
  //   signInWithGoogle(auth, googleProvider, setMessage);
  // };

  return (
    <div className="container w-100 vh-100 font-monospace">
      <div className="position-absolute bg-light top-50 start-50 translate-middle shadow p-4">
        <form onSubmit={signUp}>
          <div className="h2 text-center mt-2 mb-4">Sign up</div>
          <div className="m-3 d-md-flex justify-content-between">
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
          <div className="m-3 d-md-flex justify-content-between">
            <label className="me-1" htmlFor="password">
              Password
            </label>
            <div className="box-input">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
          <div className="w-100 p-0 m-0 mt-5 mt-md-4 text-center btn__opacity">
            <button
              type="submit"
              className="w-100 border-1 border-black text-bg-dark text-white p-2"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-2">
          <button
            // onClick={() => signUpWithGoogle()}
            className="w-100 border-1 p-2"
          >
            Continue with Google <i class="fa-brands fa-google"></i>
          </button>
        </div>
        <div className="w-100 m-0 mt-2 mb-2 text-center btn__opacity">
          <Link to="/login">
            <button className="w-100 border-1 border-black text-bg-dark text-white p-2">
              Login
            </button>
          </Link>
        </div>
        <div className="position-relative" style={{ fontSize: "10px" }}>
          <span className="position-absolute">{message && <p>{message}</p>}</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
