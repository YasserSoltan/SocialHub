import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || null
  );
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (userToken) {
        try {
          const payload = JSON.parse(atob(userToken.split(".")[1]));
          const userId = payload.sub;
          const response = await axios.get(
            `http://localhost:3000/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          setUserData(response.data);
          setError(null);
        } catch (err) {
          console.error(
            "Failed to fetch user data:",
            err.response || err.message
          );
          setError(
            err.response?.data?.message ||
              err.message ||
              "Authentication failed"
          );
          localStorage.removeItem("userToken");
          setUserToken(null);
          setUserData(null);
        }
      } else {
        setUserData(null);
        setError(null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        loading,
        setLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
