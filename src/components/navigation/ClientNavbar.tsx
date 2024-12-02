import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClientNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center ">
              <img
                src="/img/logo.png"
                alt="Gym Logo"
                className="h-10 w-[4.3rem] -mr-1 rounded-full"
              />
              <span className="text-xl font-bold text-primary-foreground hidden sm:inline">
                Fitness Center
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleLogout}
              className="justify-start bg-secondary hover:bg-secondary text-white"
            >
              <LogOut className="mr-2 h-4 w-4 text-white" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
