import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomeAdminPage from "./pages/private/HomeAdminPage";
import HomePage from "./pages/public/HomePage";
import ProtectedRoutes from "./components/guards/ProtectedRoute";
import ExercisesPage from "./pages/private/exercises/ExercisesPage";
import { Toaster } from "sonner";
import { PrivateLayout } from "./layouts/PrivateLayout";
import ClientsPage from "./pages/private/clients/ClientsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientRoutinesPage from "./pages/private/clients/routines/ClientRoutinesPage";
import ClientRoutinePage from "./pages/private/clients/routine/ClientRoutinePage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* Rutas privadas */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<PrivateLayout />}>
              <Route path="dashboard" element={<HomeAdminPage />} />{" "}
              <Route path="dashboard/clients" element={<ClientsPage />} />
              <Route path="dashboard/exercises" element={<ExercisesPage />} />
              <Route
                path="dashboard/client/routines/:id"
                element={<ClientRoutinesPage />}
              />
              <Route
                path="dashboard/client/routine/:routineId"
                element={<ClientRoutinePage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
