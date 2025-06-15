import * as Yup from "yup";
import checkUnique from "./checkUnique";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .test("unique-email", "Email already exist", async (value) => {
      const isUnique = await checkUnique("email", value);
      return isUnique;
    }),
  fullName: Yup.string()
    .required("Full name is required")
    .min(5, "Full name must be minimum 5 characters")
    .max(25, "Full name must be maximum 5 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be minimum 5 characters")
    .max(15, "Username must be maximum 5 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .test("unique-username", "Username already taken", async (value) => {
      const isUnique = await checkUnique("username", value);
      return isUnique;
    }),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .required("confirm Password is required")
    .equals([Yup.ref("password")], "Passwords must match"),
});

export { loginValidationSchema, registerValidationSchema };
