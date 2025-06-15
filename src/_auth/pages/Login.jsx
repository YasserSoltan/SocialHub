import { Link, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../Context/AuthContext";
import { loginValidationSchema } from "../../utils/validations";
import Button from "../../components/shared/ui/Button";
import api from "../../api/axios";

export default function Login() {
  // using context
  const { userToken, userData, setUserToken, setUserData } =
    useContext(AuthContext);
  const navigate = useNavigate();
  // navigate if logged in
  useEffect(() => {
    if (userToken || userData) {
      navigate("/");
    }
  }, [userToken, userData, navigate]);

  // Handle Login
  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);
      const response = await api.post(`/login`, {
        email: values.email,
        password: values.password,
      });
      const { accessToken, user } = response.data;
      localStorage.setItem("userToken", accessToken);
      setUserToken(accessToken);
      setUserData(user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      if (err.response?.status === 400) {
        setStatus("Invalid email or password");
      } else if (err.response?.status === 401) {
        setStatus("Invalid credentials");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, status, errors, touched }) => (
        <Form className="flex flex-col gap-4 w-full">
          {/* Error Message */}
          {status && (
            <div className="p-3 text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-md">
              {status}
            </div>
          )}
          {/* Email Input */}
          <div className="relative">
            <Field
              className={`w-full px-3 py-3 text-sm border rounded-md 
                         bg-gray-50 focus:bg-white focus:outline-none 
                         focus:ring-1 transition-all duration-200
                         placeholder-gray-500 ${
                           errors.email && touched.email
                             ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                             : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                         }`}
              type="email"
              name="email"
              placeholder="Email"
              disabled={isSubmitting}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <Field
              className={`w-full px-3 py-3 text-sm border rounded-md 
                         bg-gray-50 focus:bg-white focus:outline-none 
                         focus:ring-1 transition-all duration-200
                         placeholder-gray-500 ${
                           errors.password && touched.password
                             ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                             : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                         }`}
              type="password"
              name="password"
              placeholder="Password"
              disabled={isSubmitting}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
          {/* Login Button */}
          <Button
            disabled={isSubmitting}
            text={"Log in"}
            disabledText={"Logging in..."}
            type="submit"
          />
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-xs text-gray-500 uppercase">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* Signup Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-800 hover:text-blue-950 hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
