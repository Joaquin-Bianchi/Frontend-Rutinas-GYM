import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

const ProtectedRoutes = () => {
  const user = isAuthenticated(); // La función getUser() devuelve el usuario si está logueado o null si no lo está.

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
