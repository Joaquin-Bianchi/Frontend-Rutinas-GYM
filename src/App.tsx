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
import CategoryPlansPage from "./pages/private/categoryPlans/CategoryPlansPage";
import NotFound from "./components/navigation/notFound/NotFound";
import { SearchProvider } from "./context/SearchContext";
import CalculationsPage from "./pages/private/clients/calculations/CalculationsPage";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <BrowserRouter>
          <Toaster richColors />
          <Routes>
            <Route path="*" element={<NotFound />} />

            {/* Ruta pública */}
            <Route path="/login" element={<LoginPage />} />
            {/* Rutas privadas */}
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomeClientPage />} />
              <Route path="/calculator" element={<CalculationsPage />} />
              {/* Página específica para CLIENT */}
              {/* Rutas privadas para otros roles */}
              <Route element={<PrivateLayout />}>
                <Route path="dashboard" element={<HomeAdminPage />} />
                <Route path="dashboard/clients" element={<ClientsPage />} />
                <Route path="dashboard/exercises" element={<ExercisesPage />} />
                <Route
                  path="dashboard/client/routine/:id"
                  element={<ClientRoutinePage />}
                />
                <Route
                  path="dashboard/categoryPlans"
                  element={<CategoryPlansPage />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export default App;
