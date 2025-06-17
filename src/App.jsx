import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import AuthLayout from "./_auth/AuthLayout";
import Signup from "./_auth/pages/Signup";
import Login from "./_auth/pages/Login";
import ProtectedRoute from "./components/shared/ProtectedRoutes";
import AuthContextProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import PostDetails from "./_root/pages/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:postId",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:userId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default App;
