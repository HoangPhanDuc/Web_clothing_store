import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const handleOfClick = useNavigate();

  return (
    <div className="container w-100 vh-100 font-monospace">
      <form action="">
        <div className="position-absolute bg-light top-50 start-50 translate-middle shadow p-4">
          <div className="h2 text-center mt-2 mb-4">Sign up</div>
          <div className="m-3 d-md-flex justify-content-between">
            <label className="me-1" htmlFor="email">
              Email
            </label>
            <div className="box-input">
              <input type="email" name="email" id="email" />
            </div>
          </div>
          <div className="m-3 d-md-flex justify-content-between">
            <label className="me-1" htmlFor="username">
              User name
            </label>
            <div className="box-input">
              <input type="text" name="username" id="username" />
            </div>
          </div>
          <div className="m-3 d-md-flex justify-content-between">
            <label className="me-1" htmlFor="password">
              Password
            </label>
            <div className="box-input">
              <input type="password" name="password" id="password" />
            </div>
          </div>
          <div className="w-100 p-0 m-0 mt-5 mt-md-4 text-center btn__opacity">
            <button className="w-100 border-1 border-black text-bg-dark text-white ps-5 pe-5 p-2">
              Sign up
            </button>
          </div>
          <div className="w-100 m-0 mt-3 mb-2 text-center btn__opacity">
            <button
              onClick={() => {
                handleOfClick("/login");
              }}
              className="w-100 border-1 border-black text-bg-dark text-white ps-5 pe-5 p-2"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
