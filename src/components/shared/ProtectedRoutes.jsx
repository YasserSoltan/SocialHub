import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { userToken, userData, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!userToken || !userData)) {
      navigate("/login");
    }
  }, [userToken, userData, loading, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userToken || !userData) {
    return null;
  }
  return children;
};

export default ProtectedRoute;
