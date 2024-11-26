import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

const ProtectedRoutes = () => {
  const { isAuthenticated: auth, role } = isAuthenticated();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  // Si el usuario tiene rol CLIENT y está intentando acceder
  // a cualquier ruta distinta de /home, redirigir a /home
  if (role === "CLIENT" && location.pathname !== "/home") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
