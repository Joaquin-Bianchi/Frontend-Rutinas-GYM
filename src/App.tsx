import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomeAdminPage from "./pages/private/HomeAdminPage";
import HomePage from "./pages/public/HomePage";
import ProtectedRoutes from "./components/guards/ProtectedRoute";
import ExercisesPage from "./pages/private/exercises/ExercisesPage";
import { Toaster } from "sonner";
import { PrivateLayout } from "./layouts/PrivateLayout";
import ClientsPage from "./pages/private/clients/ClientsPage";

const App = () => {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* Rutas privadas */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<PrivateLayout />}>
              <Route path="dashboard" element={<HomeAdminPage />} />{" "}
              <Route path="dashboard/clients" element={<ClientsPage />} />
              <Route path="/dashboard/exercises" element={<ExercisesPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
