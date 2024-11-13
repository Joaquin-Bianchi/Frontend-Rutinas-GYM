import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomeAdminPage from "./pages/private/HomeAdminPage";
import ProtectedRoutes from "./components/guards/ProtectedRoute";
import ExercisesPage from "./pages/private/exercises/ExercisesPage";
import { Toaster } from "sonner";
import { PrivateLayout } from "./layouts/PrivateLayout";
import ClientsPage from "./pages/private/clients/ClientsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientRoutinePage from "./pages/private/clients/routine/ClientRoutinePage";
import HomeClientPage from "./pages/private/HomeClientPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />
          {/* Rutas privadas */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomeClientPage />} />
            <Route element={<PrivateLayout />}>
              <Route path="dashboard" element={<HomeAdminPage />} />{" "}
              <Route path="dashboard/clients" element={<ClientsPage />} />
              <Route path="dashboard/exercises" element={<ExercisesPage />} />
              <Route
                path="dashboard/client/routine/:id"
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
