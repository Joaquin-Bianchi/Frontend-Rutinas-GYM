import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/private/DashboardPage";
import HomePage from "./pages/public/HomePage";
import ProtectedRoutes from "./components/guards/ProtectedRoute";
import ExercisesPage from "./pages/private/exercises/ExercisesPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Rutas privadas */}
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/exercises" element={<ExercisesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
