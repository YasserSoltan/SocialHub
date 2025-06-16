import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Button from "../../components/shared/ui/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../../utils/validations";
import defaultAvatar from "../../assets/default-avatar.png";
import { uploadToCloudinary } from "../../utils/cloudinary";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function Signup() {
  const { userToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken || userData) {
      navigate("/");
    }
  }, [userToken, userData, navigate]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);
    setSubmitting(true);
    
    try {
      // Step 1: Upload default avatar
      let avatarUrl;
      try {
        const avatarResponse = await fetch(defaultAvatar);
        if (!avatarResponse.ok) throw new Error('Failed to fetch default avatar');
        
        const blob = await avatarResponse.blob();
        const file = new File([blob], "avatar.png", { type: "image/png" });
        avatarUrl = await uploadToCloudinary(file, "social_posts");
        
        if (!avatarUrl) throw new Error('Failed to upload avatar');
      } catch (avatarError) {
        console.error("Avatar upload error:", avatarError);
        setStatus("Failed to set up profile picture. Please try again.");
        return;
      }

      // Step 2: Register user
      try {
        const response = await api.post("/register", {
          email: values.email,
          password: values.password,
          username: values.username,
          fullName: values.fullName,
          bio: "",
          isPrivate: false,
          isVerified: false,
          followersCount: 0,
          followingCount: 0,
          postsCount: 0,
          avatar: avatarUrl,
        });

        if (response.status === 201) {
          toast.success("Account created successfully! Please log in.");
          navigate("/login");
        } else {
          throw new Error('Registration failed');
        }
      } catch (registerError) {
        console.error("Registration error:", registerError);
        
        if (registerError.response) {
          switch (registerError.response.status) {
            case 400:
              setStatus("Invalid input data. Please check your information.");
              break;
            case 409:
              setStatus("Email or username already exists.");
              break;
            default:
              setStatus("Registration failed. Please try again.");
          }
        } else {
          setStatus("Network error. Please check your connection.");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setStatus("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, errors, touched }) => (
        <Form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Status Message */}
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

            {/* Full Name Input */}
            <div className="relative">
              <Field
                className={`w-full px-3 py-3 text-sm border rounded-md 
                           bg-gray-50 focus:bg-white focus:outline-none 
                           focus:ring-1 transition-all duration-200
                           placeholder-gray-500 ${
                             errors.fullName && touched.fullName
                               ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                               : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                           }`}
                type="text"
                name="fullName"
                placeholder="Full name"
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Username Input */}
            <div className="relative">
              <Field
                className={`w-full px-3 py-3 text-sm border rounded-md 
                           bg-gray-50 focus:bg-white focus:outline-none 
                           focus:ring-1 transition-all duration-200
                           placeholder-gray-500 ${
                             errors.username && touched.username
                               ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                               : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                           }`}
                type="text"
                name="username"
                placeholder="Username"
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="username"
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

            {/* Confirm Password Input */}
            <div className="relative">
              <Field
                className={`w-full px-3 py-3 text-sm border rounded-md 
                           bg-gray-50 focus:bg-white focus:outline-none 
                           focus:ring-1 transition-all duration-200
                           placeholder-gray-500 ${
                             errors.confirmPassword && touched.confirmPassword
                               ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                               : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                           }`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              disabled={isSubmitting}
              text="Sign up"
              disabledText="Creating Account..."
              type="submit"
            />

            {/* Terms and Privacy */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing up, you agree to our{" "}
                <a href="#" className="text-blue-800 hover:underline">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="text-blue-800 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-800 hover:underline">
                  Cookies Policy
                </a>
                .
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500 uppercase tracking-wide">
                OR
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-800 hover:text-blue-950 hover:underline font-semibold"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
