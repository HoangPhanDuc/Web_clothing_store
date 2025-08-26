import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  createAccountByEmailAndPassAPI,
  signInWithGoogleAuth,
} from "../../api/user.api.js";
import "../../assets/css/login-sign-up.css";
import { togglePassword } from "../../redux/slice/passwordSlice.js";
import { getUser } from "../../redux/slice/userSlice.js";

export default function SignUp() {
  const dispatch = useDispatch();
  const showPass = useSelector((state) => state.passwordStore?.status);
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const userInfo = await createAccountByEmailAndPassAPI(
        values.email,
        values.password
      );
      if (userInfo) {
        toast.success("Sign up successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Sign up failed. Please try again!");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const resData = await signInWithGoogleAuth();
      dispatch(getUser(resData));
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed.");
      console.error(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className="login-box bg-white p-4 rounded shadow"
        style={{ minWidth: 352 }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <Field
                    name="password"
                    type={showPass ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <span
                    className="input-group-text"
                    onClick={() => dispatch(togglePassword())}
                  >
                    <i
                      className={`fa-regular ${
                        showPass ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="d-grid mb-3">
          <button
            onClick={signInWithGoogle}
            className="btn btn-outline-secondary"
          >
            <i className="fa-brands fa-google me-2"></i> Continue with Google
          </button>
        </div>

        <div className="text-center mb-2">
          <Link to="/login" className="btn btn-sm btn-outline-dark w-100">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
