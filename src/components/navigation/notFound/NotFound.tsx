import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

const NotFound = () => {
  const { role } = isAuthenticated();

  if (role === "CLIENT") {
    return <Navigate to="/home" replace />;
  } else if (role === "ADMIN" || role === "COACH") {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default NotFound;
