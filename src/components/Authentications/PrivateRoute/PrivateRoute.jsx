import { Navigate } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
 

 const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
